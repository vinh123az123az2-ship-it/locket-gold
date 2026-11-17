/**
 * =============================================================================
 *   🚀 LOCKET GOLD VIP - DELETE ETAG & CACHE HEADER SCRIPT
 *   Tác giả: langtucamau
 *   Hỗ trợ: https://github.com/vinh123az123az2-ship-it/locket-gold
 * =============================================================================
 */

let headers = $request.headers || {};
delete headers['If-None-Match'];
delete headers['if-none-match'];
delete headers['If-Modified-Since'];
delete headers['if-modified-since'];
delete headers['X-RevenueCat-ETag'];
delete headers['x-revenuecat-etag'];

$done({ headers });
