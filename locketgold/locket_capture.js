/**
 * CAPTURE (TẠM) — log response THẬT của generateFilteredImage để lấy khuôn body.
 * Chiều http-response (requires-body=true). Đọc $response, đẩy về Worker /capture-resp,
 * rồi $done({}) trả response NGUYÊN XI cho app (không sửa gì). Gỡ sau khi lấy xong.
 */
var CAPTURE_URL = "https://locket-gold.locket-gold.workers.dev/capture-resp";

(function () {
  if (typeof $response === "undefined") return $done({});
  var payload = {
    status: $response.status,
    headers: $response.headers || {},
    body: ($response.body || "").slice(0, 8000)
  };
  $httpClient.post({
    url: CAPTURE_URL,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    timeout: 20
  }, function () {
    $done({}); // luôn trả response gốc cho app, dù log thành công hay không
  });
})();
