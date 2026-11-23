// CloudFront Function (viewer request), runtime cloudfront-js-2.0
// 1. Sends pratibhakanoo.com → https://www.pratibhakanoo.com (301)
// 2. Serves /folder/ and /folder as /folder/index.html (Next.js static export)
function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;

  if (host === "pratibhakanoo.com") {
    var qs = Object.keys(request.querystring)
      .map(function (k) {
        var v = request.querystring[k];
        return v.value ? k + "=" + v.value : k;
      })
      .join("&");
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "https://www.pratibhakanoo.com" + request.uri + (qs ? "?" + qs : "") },
      },
    };
  }

  var uri = request.uri;
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.split("/").pop().includes(".")) {
    request.uri = uri + "/index.html";
  }
  return request;
}
