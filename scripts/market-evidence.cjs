'use strict';
// Research only. This module never writes to the production catalogue.
const slots = ['cpu','gpu','motherboard','ram','ssd','psu','cooler','case'];
const money = n => Number.isSafeInteger(n) && n >= 0;
function summarise(rows, now) {
  if (!Array.isArray(rows) || rows.length !== 8 ||
      slots.some(s => rows.filter(r => r.slot === s).length !== 1)) {
    throw new Error('Exactly one observation for each of the eight slots is required');
  }
  const clock = Date.parse(now);
  if (!Number.isFinite(clock)) throw new Error('Explicit valid review time required');
  const blockers = [];
  for (const r of rows) {
    const stamp = typeof r.verifiedAt === 'string' && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(r.verifiedAt)
      ? Date.parse(r.verifiedAt) : NaN;
    const age = clock - stamp;
    if (!Number.isFinite(age) || age < 0 || age > 86400000) blockers.push(r.slot + ': timed fresh evidence missing');
    if (r.evidenceKind !== 'verified_offer' || r.identityVerified !== true ||
        typeof r.mpn !== 'string' || !r.mpn.trim() || r.sellerVerified !== true ||
        typeof r.seller !== 'string' || !r.seller.trim() || r.condition !== 'new' ||
        r.currency !== 'GBP' || r.vatIncluded !== true || r.stock !== 'in_stock' ||
        r.contradictory === true || !Number.isInteger(r.dispatchWorkingDays) ||
        r.dispatchWorkingDays < 0 || r.dispatchWorkingDays > 5) blockers.push(r.slot + ': offer incomplete');
    if (!money(r.itemPence) || !money(r.deliveryPence)) blockers.push(r.slot + ': price or delivery unknown');
    // Delivery must be a reviewed allocation from an actual basket quote.
    if (r.deliveryBasis !== 'verified_basket_allocation') blockers.push(r.slot + ': basket delivery unverified');
  }
  const indicativeItemSubtotalPence = rows.every(r => money(r.itemPence))
    ? rows.reduce((n,r) => n + r.itemPence, 0) : null;
  const deliveredEvidenceTotalPence = blockers.length ? null
    : rows.reduce((n,r) => n + r.itemPence + r.deliveryPence, 0);
  return {indicativeItemSubtotalPence, deliveredEvidenceTotalPence, blockers, purchasingApproval:false};
}
module.exports = {summarise};
