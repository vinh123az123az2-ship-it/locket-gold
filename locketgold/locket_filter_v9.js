/**
 * LOCKET GOLD VIP - AI FILTER v9 (envelope DATA, khong phai RESULT)
 *
 * RE ground truth: binary co 2 chuoi loi validation cua FirebaseFunctions SDK:
 *   "Response is missing data field."            -> duong .call() THUONG (app dung)
 *   "Response is missing result or message field."-> duong .stream()
 * KHONG co chuoi "missing result field" rieng => .call() doi key DATA, khong phai result.
 * Suot may ngay tra {"result":{outputUrl}} nen SDK tim 'data' khong thay => throw.
 *
 * v9: tra {"data":{"outputUrl":<input>}} thang tren api.locketcamera.com ($done-direct).
 * outputUrl = anh input (firebasestorage, host hop le). App hien anh => envelope DUNG,
 * chi con rap generate that. Van loi => sai cho khac, doc probe xem script co chay.
 *
 * Probe dong bo xac nhan script chay. Fallback: body loi => $done({}).
 */
var WORKER = "https://locket-gold.locket-gold.workers.dev/generateFilteredImage";
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

  var payload = JSON.stringify({ data: { outputUrl: imageUrl } });
  var reply = { response: { status: 200, headers: { "Content-Type": "application/json" }, body: payload } };

  var probeUrl = WORKER + "?s=" + encodeURIComponent(SECRET) +
    "&probe=v9ran&image_url=" + encodeURIComponent(imageUrl);
  try {
    $httpClient.get({ url: probeUrl }, function () { $done(reply); });
  } catch (e) {
    $done(reply);
  }
})();
