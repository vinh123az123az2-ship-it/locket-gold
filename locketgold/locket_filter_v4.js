/**
 * LOCKET GOLD VIP - AI FILTER v3 ($done inject, KHÔNG redirect)
 *
 * Test tổ hợp chưa thử: $done nhét thẳng response 200 (không 302) + body camelCase.
 * Nếu Firebase callable SDK từ chối response qua redirect, cách này (response trực tiếp
 * trên chính request gốc) mới đúng. Script gọi Worker POST lấy JSON rồi $done trả thẳng.
 *
 * Fallback: Worker != 200 -> $done({}) cho request đi tiếp tới Locket.
 */
var WORKER_URL = "https://locket-gold.locket-gold.workers.dev/generateFilteredImage";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $request === "undefined") return $done({});
  var body = $request.body;
  if (!body) return $done({});

  $httpClient.post({
    url: WORKER_URL,
    headers: { "Content-Type": "application/json", "X-Worker-Secret": WORKER_SECRET },
    body: body,
    timeout: 55
  }, function (err, resp, data) {
    if (!err && resp && resp.status === 200 && data) {
      // Forward Content-Type từ Worker (SSE text/event-stream cho Firebase callable streaming)
      var h = resp.headers || {};
      var ct = h["Content-Type"] || h["content-type"] || "text/event-stream; charset=utf-8";
      return $done({
        response: {
          status: 200,
          headers: { "Content-Type": ct },
          body: data
        }
      });
    }
    return $done({});
  });
})();
