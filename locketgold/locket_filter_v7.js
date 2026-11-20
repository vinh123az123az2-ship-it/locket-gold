/**
 * LOCKET GOLD VIP - AI FILTER v7 ($done-direct, echo INPUT image)
 *
 * Phan biet 2 kha nang con lai sau khi v6 (echo workers.dev) van loi:
 *   - HOST-VALIDATION: app decode outputUrl OK nhung tu choi host workers.dev
 *     (chi nhan firebasestorage/locketcamera) truoc khi tai.
 *   - DECODE/SDK: callable SDK tu choi response synthetic du dung khuon.
 *
 * v7 tra outputUrl = CHINH anh input cua app (firebasestorage, host hop le, anh that,
 * chac chan tai duoc), bang $done-direct tren api.locketcamera.com (khong 302).
 *
 * Doc ket qua bang MAT, khong can KV:
 *   - App HIEN anh (anh goc lam "ket qua filter") => delivery + decode + host THONG,
 *     chi con thieu generate. Pivot: host anh generate tren host hop le.
 *   - Van "khong ap dung duoc" => host da loai (dung host hop le), loi o decode/SDK
 *     => chot can VPS genuine.
 *
 * Fallback: body loi => $done({}) cho di tiep.
 */
(function () {
  if (typeof $request === "undefined") return $done({});
  var body = $request.body;
  if (!body) return $done({});
  var data;
  try { var o = JSON.parse(body); data = (o && o.data) ? o.data : o; } catch (e) { return $done({}); }
  if (!data || typeof data !== "object") return $done({});
  var imageUrl = data.image_url || data.imageUrl || data.url || "";
  if (!imageUrl) return $done({});

  // Firebase callable .call() envelope: result.outputUrl. outputUrl = chinh anh input.
  var payload = JSON.stringify({ result: { outputUrl: imageUrl } });
  return $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: payload
    }
  });
})();
