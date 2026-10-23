'use strict';
// Internal, read-only evidence gate. Never writes canonical data or approves buying.
const SLOTS = ['cpu','gpu','motherboard','ram','ssd','psu','cooler','case'];
const money = n => Number.isSafeInteger(n) && n >= 0;
function assess(proposal, now) {
  const at = Date.parse(now);
  if (!Number.isFinite(at)) throw new Error('Explicit valid assessment time required');
  const blockers = [];
  const fresh = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) &&
    at >= Date.parse(value) && at - Date.parse(value) <= 86400000;
  const parts = proposal.parts || [], baskets = proposal.baskets || [];
  const exactSlots = list => list.length === 8 && new Set(list).size === 8 && SLOTS.every(s => list.includes(s));
  if (!exactSlots(parts.map(p => p.slot))) blockers.push('EIGHT_UNIQUE_PARTS_REQUIRED');
  for (const p of parts) {
    if (!money(p.itemPricePence) || p.itemPricePence === 0 || p.quantity !== 1 ||
        p.currency !== 'GBP' || p.vatIncluded !== true || p.identityVerified !== true ||
        p.sellerIsRetailer !== true || p.condition !== 'new' || !p.manufacturerModel ||
        !/^https:\/\//.test(p.productUrl || '') || p.availabilityObserved !== 'in_stock' ||
        p.dispatchVerified !== true) blockers.push('INCOMPLETE_PART:' + p.slot);
    if (!fresh(p.verifiedAt)) blockers.push('UNVERIFIED_OR_STALE_PART:' + p.slot);
  }
  const allocated = baskets.flatMap(b => b.slots || []);
  if (!exactSlots(allocated)) blockers.push('EXACT_BASKET_COVERAGE_REQUIRED');
  if (new Set(baskets.map(b => b.seller)).size !== baskets.length) blockers.push('DUPLICATE_SELLER_BASKET');
  for (const b of baskets) {
    if (!b.slots?.length || b.slots.some(s => !parts.some(p => p.slot === s && p.seller === b.seller)) ||
        !money(b.shippingPence) || b.postcodeVerified !== true ||
        b.currency !== 'GBP' || b.vatIncluded !== true || !fresh(b.verifiedAt))
      blockers.push('UNVERIFIED_BASKET:' + b.seller);
  }
  const subtotal = exactSlots(parts.map(p => p.slot)) && parts.every(p => money(p.itemPricePence))
    ? parts.reduce((n,p) => n + p.itemPricePence, 0) : null;
  if (subtotal !== proposal.itemSubtotalPence) blockers.push('SUBTOTAL_MISMATCH');
  const delivered = blockers.length ? null : subtotal + baskets.reduce((n,b) => n + b.shippingPence, 0);
  const good = proposal.proposedGoodBuyDeliveredPence, max = proposal.proposedAcceptableMaximumDeliveredPence;
  if (!money(good) || !money(max) || good <= 0 || max < good) blockers.push('INVALID_PROPOSED_BANDS');
  const ready = blockers.length === 0;
  return {
    itemSubtotalPence: subtotal,
    verifiedDeliveredTotalPence: ready ? delivered : null,
    evidenceComplete: ready,
    // This is comparison arithmetic only, never a purchasing status or approval.
    proposedBandComparison: !ready ? null : delivered <= good ? 'AT_OR_BELOW_GOOD_BUY_TARGET' : delivered <= max ? 'WITHIN_ACCEPTABLE_LIMIT' : 'ABOVE_ACCEPTABLE_LIMIT',
    purchasingApproved: false,
    configurationCStatus: 'HOLD',
    blockers
  };
}
if (require.main === module) {
  try {
    if (process.argv.length !== 4) throw new Error('Usage: node scripts/check-delivered-basket.cjs PROPOSAL_JSON ISO_TIMESTAMP');
    const result = assess(JSON.parse(require('node:fs').readFileSync(process.argv[2], 'utf8')), process.argv[3]);
    console.log(JSON.stringify(result, null, 2));
    if (!result.evidenceComplete) process.exitCode = 2;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = {assess};
