/**
 * LOCKET GOLD VIP - AI FILTER v8 (proof-of-run beacon + $done-direct)
 *
 * Muc dich: xac nhan script CO chay tren may (loai diem mu re-import), truoc khi ket luan
 * decode/SDK la tuong. Beacon DONG BO: goi Worker /generateFilteredImage?probe=v8ran roi
 * moi $done ben trong callback -> beacon chac chan ghi KV (beacon_filter method GET, qs co
 * 'probe') truoc khi tra response. Doc KV thay probe=v8ran => script da chay.
 *
 * Response van la $done-direct (echo input image, host hop le) nhu v7.
 *
 * Fallback: body loi => $done({}).
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

  var payload = JSON.stringify({ result: { outputUrl: imageUrl } });
  var reply = { response: { status: 200, headers: { "Content-Type": "application/json" }, body: payload } };

  var probeUrl = WORKER + "?s=" + encodeURIComponent(SECRET) +
    "&probe=v8ran&image_url=" + encodeURIComponent(imageUrl);

  // Beacon dong bo: cho Worker ghi KV xong moi tra response ve app.
  try {
    $httpClient.get({ url: probeUrl }, function () { $done(reply); });
  } catch (e) {
    $done(reply);
  }
})();
