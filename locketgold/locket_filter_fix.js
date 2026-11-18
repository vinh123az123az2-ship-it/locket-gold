/**
 * LOCKET GOLD VIP - AI FILTER (generateFilteredImage)
 * Tác giả: langtucamau
 *
 * Chiều http-request (requires-body=true).
 *
 * KHÔNG rewrite URL. Lý do: app Locket dồn nhiều request trên 1 socket TCP
 * (HTTP pipelining) nối tới server Locket. Khi rewrite URL sang domain khác
 * (workers.dev), Shadowrocket đẩy bytes vào đúng socket cũ đang nối server
 * Locket → server nhận Host lạ → đóng socket ("Socket closed by remote peer").
 *
 * Cách đúng: script tự gọi Worker bằng $httpClient (kết nối riêng tới
 * Cloudflare, không đụng socket pipeline), nhận JSON {result:{outputUrl}},
 * rồi $done({response}) trả thẳng cho app. Request gốc KHÔNG đi tới Locket.
 *
 * Fallback: Worker lỗi/không ra ảnh (status != 200) → $done({}) để request
 * đi tiếp tới Locket thật (hành vi gốc), tránh nhét JSON lỗi vào app.
 */

var WORKER_URL = "https://locket-gold.locket-gold.workers.dev/generateFilteredImage";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $request === "undefined") return $done({});

  var body = $request.body;
  if (!body) return $done({}); // không có body → để đi tiếp tới Locket

  $httpClient.post({
    url: WORKER_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Worker-Secret": WORKER_SECRET
    },
    body: body,
    timeout: 55
  }, function (err, resp, data) {
    if (!err && resp && resp.status === 200 && data) {
      return $done({
        response: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: data
        }
      });
    }
    // Worker lỗi hoặc không ra ảnh → để request gốc đi tiếp tới Locket
    return $done({});
  });
})();
