#!/usr/bin/env bash
# One-time AWS setup for www.pratibhakanoo.com
#   S3 (private) + ACM SSL + CloudFront (+ function, OAC) + Route 53 + GitHub OIDC role
#   + GitHub environment secrets/variables.
#
# Needs: aws CLI v2 (logged in as an admin), jq, gh CLI (logged in), run from the repo root.
# 

set -euo pipefail

source ${PWD}/.env

say() { printf '\n\033[1;35m▶ %s\033[0m\n' "$*"; }
for cmd in aws jq gh; do command -v "$cmd" >/dev/null || { echo "Missing: $cmd"; exit 1; }; done

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
HZ_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN." \
  --query "HostedZones[?Name=='${DOMAIN}.'].Id | [0]" --output text | sed 's|/hostedzone/||')
[[ "$HZ_ID" == "None" || -z "$HZ_ID" ]] && { echo "No Route 53 hosted zone for $DOMAIN"; exit 1; }
echo "Account $ACCOUNT_ID · hosted zone $HZ_ID · bucket $BUCKET · repo $GH_REPO"

# ---------------------------------------------------------------- 1. S3
say "1/8 S3 bucket (private)"
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "exists"
else
  aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION" >/dev/null
fi
aws s3api put-public-access-block --bucket "$BUCKET" --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-versioning --bucket "$BUCKET" --versioning-configuration Status=Enabled

# ---------------------------------------------------------------- 2. ACM
say "2/8 SSL certificate (us-east-1)"
CERT_ARN=$(aws acm list-certificates --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='${DOMAIN}'].CertificateArn | [0]" --output text)
if [[ "$CERT_ARN" == "None" || -z "$CERT_ARN" ]]; then
  CERT_ARN=$(aws acm request-certificate --region us-east-1 \
    --domain-name "$DOMAIN" --subject-alternative-names "$WWW" \
    --validation-method DNS --query CertificateArn --output text)
  sleep 10   # give ACM a moment to generate the validation records
fi
echo "$CERT_ARN"

aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" \
  --query 'Certificate.DomainValidationOptions[].ResourceRecord' --output json |
  jq '{Changes: (unique_by(.Name) | map({Action:"UPSERT",
        ResourceRecordSet:{Name:.Name, Type:.Type, TTL:300, ResourceRecords:[{Value:.Value}]}}))}' \
  > /tmp/acm-validation.json
aws route53 change-resource-record-sets --hosted-zone-id "$HZ_ID" \
  --change-batch file:///tmp/acm-validation.json >/dev/null
echo "Waiting for the certificate to be issued (usually 5 to 30 min)…"
aws acm wait certificate-validated --region us-east-1 --certificate-arn "$CERT_ARN"

# ---------------------------------------------------------------- 3. Function
say "3/8 CloudFront Function"
if aws cloudfront describe-function --name "$FUNC_NAME" >/dev/null 2>&1; then
  ETAG=$(aws cloudfront describe-function --name "$FUNC_NAME" --query ETag --output text)
  ETAG=$(aws cloudfront update-function --name "$FUNC_NAME" --if-match "$ETAG" \
    --function-config Comment="www redirect + index.html",Runtime=cloudfront-js-2.0 \
    --function-code fileb://infra/cloudfront-function.js --query ETag --output text)
else
  ETAG=$(aws cloudfront create-function --name "$FUNC_NAME" \
    --function-config Comment="www redirect + index.html",Runtime=cloudfront-js-2.0 \
    --function-code fileb://infra/cloudfront-function.js --query ETag --output text)
fi
aws cloudfront publish-function --name "$FUNC_NAME" --if-match "$ETAG" >/dev/null
FUNC_ARN=$(aws cloudfront describe-function --name "$FUNC_NAME" --stage LIVE \
  --query FunctionSummary.FunctionMetadata.FunctionARN --output text)

# ---------------------------------------------------------------- 4. OAC + distribution
say "4/8 CloudFront distribution"
OAC_ID=$(aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='${OAC_NAME}'].Id | [0]" --output text)
if [[ "$OAC_ID" == "None" || -z "$OAC_ID" ]]; then
  OAC_ID=$(aws cloudfront create-origin-access-control --origin-access-control-config \
    Name="$OAC_NAME",SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3 \
    --query OriginAccessControl.Id --output text)
fi

DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items && contains(Aliases.Items, '${WWW}')].Id | [0]" --output text)
if [[ "$DIST_ID" == "None" || -z "$DIST_ID" ]]; then
  ORIGIN_ID="s3-${BUCKET}"
  jq -n \
    --arg ref "pratibhakanoo-$(date +%s)" --arg apex "$DOMAIN" --arg www "$WWW" \
    --arg origin "$ORIGIN_ID" --arg domain "${BUCKET}.s3.${REGION}.amazonaws.com" \
    --arg oac "$OAC_ID" --arg cert "$CERT_ARN" --arg func "$FUNC_ARN" --arg cache "$CACHING_OPTIMIZED" '
  {
    CallerReference: $ref,
    Comment: "www.pratibhakanoo.com",
    Enabled: true,
    Aliases: {Quantity: 2, Items: [$www, $apex]},
    DefaultRootObject: "index.html",
    HttpVersion: "http2and3",
    IsIPV6Enabled: true,
    PriceClass: "PriceClass_200",
    Origins: {Quantity: 1, Items: [{
      Id: $origin, DomainName: $domain, OriginAccessControlId: $oac,
      S3OriginConfig: {OriginAccessIdentity: ""}
    }]},
    DefaultCacheBehavior: {
      TargetOriginId: $origin,
      ViewerProtocolPolicy: "redirect-to-https",
      CachePolicyId: $cache,
      Compress: true,
      AllowedMethods: {Quantity: 2, Items: ["GET","HEAD"],
        CachedMethods: {Quantity: 2, Items: ["GET","HEAD"]}},
      FunctionAssociations: {Quantity: 1, Items: [{FunctionARN: $func, EventType: "viewer-request"}]}
    },
    CustomErrorResponses: {Quantity: 2, Items: [
      {ErrorCode: 403, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 10},
      {ErrorCode: 404, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 10}
    ]},
    ViewerCertificate: {
      ACMCertificateArn: $cert, SSLSupportMethod: "sni-only",
      MinimumProtocolVersion: "TLSv1.2_2021"
    }
  }' > /tmp/distribution.json
  DIST_ID=$(aws cloudfront create-distribution --distribution-config file:///tmp/distribution.json \
    --query Distribution.Id --output text)
fi
DIST_DOMAIN=$(aws cloudfront get-distribution --id "$DIST_ID" --query Distribution.DomainName --output text)
echo "Distribution $DIST_ID → $DIST_DOMAIN"

# ---------------------------------------------------------------- 5. Bucket policy
say "5/8 Bucket policy (CloudFront only)"
jq -n --arg bucket "$BUCKET" --arg src "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DIST_ID}" '{
  Version: "2012-10-17",
  Statement: [{
    Sid: "AllowCloudFrontRead",
    Effect: "Allow",
    Principal: {Service: "cloudfront.amazonaws.com"},
    Action: "s3:GetObject",
    Resource: "arn:aws:s3:::\($bucket)/*",
    Condition: {StringEquals: {"AWS:SourceArn": $src}}
  }]}' > /tmp/bucket-policy.json
aws s3api put-bucket-policy --bucket "$BUCKET" --policy file:///tmp/bucket-policy.json

# ---------------------------------------------------------------- 6. Route 53
say "6/8 Route 53 alias records"
jq -n --arg apex "$DOMAIN" --arg www "$WWW" --arg target "$DIST_DOMAIN" --arg zone "$CLOUDFRONT_ZONE" '
  {Changes: [ ($apex, $www) as $name | ("A","AAAA") as $type | {
    Action: "UPSERT",
    ResourceRecordSet: {Name: $name, Type: $type,
      AliasTarget: {HostedZoneId: $zone, DNSName: $target, EvaluateTargetHealth: false}}
  }]}' > /tmp/alias-records.json
aws route53 change-resource-record-sets --hosted-zone-id "$HZ_ID" \
  --change-batch file:///tmp/alias-records.json >/dev/null

# ---------------------------------------------------------------- 7. GitHub OIDC role
say "7/8 GitHub OIDC deploy role"
OIDC_ARN="arn:aws:iam::${ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
if ! aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$OIDC_ARN" >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 >/dev/null
fi

GH_USER="${GH_REPO%%/*}"; GH_NAME="${GH_REPO##*/}"
sed -e "s|<ACCOUNT_ID>|${ACCOUNT_ID}|g" -e "s|<GITHUB_USER>|${GH_USER}|g" -e "s|<REPO_NAME>|${GH_NAME}|g" \
  infra/github-trust-policy.json > /tmp/trust.json
sed -e "s|<ACCOUNT_ID>|${ACCOUNT_ID}|g" -e "s|<BUCKET_NAME>|${BUCKET}|g" -e "s|<DISTRIBUTION_ID>|${DIST_ID}|g" \
  infra/github-deploy-policy.json > /tmp/deploy-policy.json

if aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$ROLE_NAME" --policy-document file:///tmp/trust.json
else
  aws iam create-role --role-name "$ROLE_NAME" --assume-role-policy-document file:///tmp/trust.json \
    --description "GitHub Actions deploy for ${GH_REPO}" >/dev/null
fi
aws iam put-role-policy --role-name "$ROLE_NAME" --policy-name deploy-site \
  --policy-document file:///tmp/deploy-policy.json
ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query Role.Arn --output text)

# ---------------------------------------------------------------- 8. GitHub settings
say "8/8 GitHub environment, secret and variables"
gh api -X PUT "repos/${GH_REPO}/environments/production" >/dev/null
gh secret set AWS_ROLE_ARN --env production --repo "$GH_REPO" --body "$ROLE_ARN"
gh variable set S3_BUCKET --env production --repo "$GH_REPO" --body "$BUCKET"
gh variable set CF_DISTRIBUTION_ID --env production --repo "$GH_REPO" --body "$DIST_ID"

cat <<EOF

✅ Done.
  Bucket:        $BUCKET ($REGION)
  Certificate:   $CERT_ARN
  Distribution:  $DIST_ID ($DIST_DOMAIN)  · takes ~5-15 min to deploy worldwide
  Deploy role:   $ROLE_ARN

Next:
  • Optional: set the booking URL →
      gh variable set NEXT_PUBLIC_BOOKING_API_URL --env production --repo $GH_REPO --body "https://script.google.com/macros/s/XXX/exec"
  • Optional: CloudFront console → this distribution → choose the Free flat-rate pricing plan.
  • Deploy:  git push origin main   (or: gh workflow run deploy.yml --repo $GH_REPO)
EOF
