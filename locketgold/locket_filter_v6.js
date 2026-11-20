/**
 * LOCKET GOLD VIP - AI FILTER v6 ($done-direct, KHÔNG 302)
 *
 * Phép thử cô lập DELIVERY: beacon xác nhận app gửi callable .call() POST (accept */*,
 * ctype json), Worker trả JSON {"result":{"outputUrl"}} đúng khuôn RE, 200 — nhưng app
 * KHÔNG tải (img_echo_hit rỗng). SDWebImage không chặn host → decode/SDK vứt kết quả.
 * Biến còn lại = 302. FirebaseFunctions callable SDK không honor response bị redirect.
 *
 * v6: trả response ĐÚNG THẲNG trên api.locketcamera.com (type=http-request $done),
 * KHÔNG nhảy workers.dev. outputUrl trỏ /img/echo.jpg (JPEG thật trên Worker, SDWebImage
 * tải được + log img_echo_hit). App tải echo => 302 là thủ phạm, delivery THÔNG.
 * Không tải => SDK đòi server genuine, phải VPS host-map.
 *
 * Fallback: body lỗi => $done({}) cho đi tiếp.
 */
var ECHO_OUTPUT = "https://locket-gold.locket-gold.workers.dev/img/echo.jpg";

(function () {
  if (typeof $request === "undefined") return $done({});
  var body = $request.body;
  if (!body) return $done({});
  var data;
  try { var o = JSON.parse(body); data = (o && o.data) ? o.data : o; } catch (e) { return $done({}); }
  if (!data || typeof data !== "object") return $done({});
  var imageUrl = data.image_url || data.imageUrl || data.url || "";
  if (!imageUrl) return $done({});

  // Firebase callable .call() envelope: { result: <payload> }, payload = {outputUrl: URL}.
  var payload = JSON.stringify({ result: { outputUrl: ECHO_OUTPUT } });
  return $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: payload
    }
  });
})();
