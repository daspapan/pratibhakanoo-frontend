import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export → plain HTML/CSS/JS in /out, ready for S3 + CloudFront.
  output: "export",
  // next/image optimisation needs a server; export ships images as-is.
  // Keep the files in /public/images small (WebP, under ~200 KB).
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
