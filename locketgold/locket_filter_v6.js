/**
 * LOCKET GOLD VIP - AI FILTER v6 ($done-direct, KHÔNG 302)
 *
 * Phep thu co lap DELIVERY: beacon xac nhan app gui callable .call() POST (accept any,
 * ctype json), Worker tra JSON result.outputUrl dung khuon RE, 200 nhung app KHONG tai
 * (img_echo_hit rong). SDWebImage khong chan host nen decode/SDK vut ket qua.
 * Bien con lai = 302. FirebaseFunctions callable SDK khong honor response bi redirect.
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
