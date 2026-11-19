/**
 * CAPTURE (TẠM) — log response THẬT của generateFilteredImage để lấy khuôn body.
 * Chiều http-response (requires-body=true). Đọc $response, đẩy về Worker /capture-resp,
 * rồi $done({}) trả response NGUYÊN XI cho app (không sửa gì). Gỡ sau khi lấy xong.
 */
var CAPTURE_URL = "https://locket-gold.locket-gold.workers.dev/capture-resp";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $response === "undefined") return $done({});
  // CHỈ lấy status + body (khuôn JSON cần). KHÔNG gửi headers (tránh lộ token/cookie của Sếp).
  var payload = {
    status: $response.status,
    body: ($response.body || "").slice(0, 8000)
  };
  $httpClient.post({
    url: CAPTURE_URL,
    headers: { "Content-Type": "application/json", "X-Worker-Secret": WORKER_SECRET },
    body: JSON.stringify(payload),
    timeout: 20
  }, function () {
    $done({}); // luôn trả response gốc cho app, dù log thành công hay không
  });
})();
