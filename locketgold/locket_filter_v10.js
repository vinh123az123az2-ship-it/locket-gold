/**
 * LOCKET GOLD VIP - AI FILTER v10 (data envelope + echo.jpg tren Worker = do duoc)
 *
 * v9 (data + anh firebasestorage) van loi, nhung outputUrl la firebasestorage nen KHONG
 * biet app co TAI khong (callable pass hay fail). v10 tra outputUrl = /img/echo.jpg tren
 * Worker -> fetch do log img_echo_hit. Phan biet dut khoat:
 *   img_echo_hit NO  => callable NHAN data envelope + tai anh => data DUNG, chi con generate that
 *   img_echo_hit RONG => data envelope cung bi tu choi o callable => envelope khong phai van de
 *
 * Probe dong bo xac nhan script chay. Fallback: body loi => $done({}).
 */
var WORKER_BASE = "https://locket-gold.locket-gold.workers.dev";
var SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $request === "undefined") return $done({});
  var body = $request.body;
  if (!body) return $done({});
  var data;
  try { var o = JSON.parse(body); data = (o && o.data) ? o.data : o; } catch (e) { return $done({}); }
  if (!data || typeof data !== "object") return $done({});
  var imageUrl = data.image_url || data.imageUrl || data.url || "";
  if (!imageUrl) return $done({});

  var echo = WORKER_BASE + "/img/echo.jpg";
  var payload = JSON.stringify({ data: { outputUrl: echo } });
  var reply = { response: { status: 200, headers: { "Content-Type": "application/json" }, body: payload } };

  var probeUrl = WORKER_BASE + "/generateFilteredImage?s=" + encodeURIComponent(SECRET) + "&probe=v10ran&image_url=" + encodeURIComponent(imageUrl);
  try {
    $httpClient.get({ url: probeUrl }, function () { $done(reply); });
  } catch (e) {
    $done(reply);
  }
})();
