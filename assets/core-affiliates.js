/* Editorially verified destinations only. No prices, stock or purchasing evidence. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.CoreAffiliates=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const catalogue={
 retailers:{amazonUK:{name:'Amazon',tag:'buildwithcore-21'}},
 products:{ryzen9600x:[{retailerId:'amazonUK',mpn:'100-100001405WOF',asin:'B0D6NN6TM7',identityVerified:true,verificationNote:'Exact Ryzen 5 9600X destination supplied and successfully tested by the project owner.'}],
  msib850:[{retailerId:'amazonUK',ean:'4711377285438',asin:'B0DPKV94MX',identityVerified:true,verificationNote:'2026-10-04: Amazon UK GTIN 04711377285438 matches CORE EAN; original B850 GAMING PLUS WIFI, ATX, Wi-Fi 7. Amazon model 7E56-001R.'}],
  gigabyte9070:[{retailerId:'amazonUK',mpn:'GV-R9070GAMING OC-16GD',asin:'B0DS2QZC9P',identityVerified:true,verificationNote:'2026-10-04: Amazon UK exact manufacturer part number; Gigabyte RX 9070 GAMING OC 16G, 16GB GDDR6; UPC 889523047552.'}],
  pulse9070:[{retailerId:'amazonUK',mpn:'11349-03-20G',asin:'B0DRPSF34T',identityVerified:true,verificationNote:'2026-10-04: Amazon UK exact manufacturer part number; Sapphire PULSE RX 9070 16GB GDDR6; GTIN 04895106295971.'}],
  fitv28:[{retailerId:'amazonUK',mpn:'KD5AGU880-60B280L',asin:'B0FMR83P3F',identityVerified:true,verificationNote:'2026-10-04: Amazon UK exact MPN; KLEVV FIT V black 32GB (2x16GB), DDR5-6000 CL28, AMD EXPO, 33.2mm. Not the 60B280F variant.'}],
  sn5100:[{retailerId:'amazonUK',mpn:'WDS200T5B0E-00CPE0',asin:'B0FJ8QMW4H',identityVerified:true,verificationNote:'2026-10-04: Amazon UK WDS200T5B0E, UPC 718037906263; Blue SN5100 2TB bare M.2 2280, PCIe 4.0, 7100/6700 MB/s. SanDisk maps this 2TB model to full SKU WDS200T5B0E-00CPE0.'}],
  sn7100:[{retailerId:'amazonUK',mpn:'WDS200T4X0E-00CJA0',asin:'B0DN6ZQ3PD',identityVerified:true,verificationNote:'2026-10-04: Amazon UK WDS200T4X0E, UPC 718037893211; WD_BLACK SN7100 2TB bare M.2 2280 TLC, 7250/6900 MB/s, 1200 TBW. SanDisk maps this 2TB model to full SKU WDS200T4X0E-00CJA0.'}],
  rm750x:[{retailerId:'amazonUK',mpn:'CP-9020285-UK',asin:'B0D9BZ2BDB',identityVerified:true,verificationNote:'2026-10-04: Amazon UK exact UK model and manufacturer part number; Corsair RM750x 2024, ATX 3.1, PCIe 5.1, native 12V-2x6; UPC 840006676911.'}],
  h6flow:[{retailerId:'amazonUK',mpn:'CC-H61FB-01',asin:'B0C89FCDFP',identityVerified:true,verificationNote:'2026-10-04: Amazon UK exact model, manufacturer part number and box contents; original NZXT H6 Flow black non-RGB, three 120mm fans; UPC 810074844147.'}]
 }
};
// Fail closed on changed identity. EAN-only entries support CORE records without an MPN.
// An MPN record never falls back to EAN, even if its MPN is missing or changed.
function links(componentId,component,data=catalogue){
 return (data?.products?.[componentId]||[]).flatMap(p=>{
  const retailer=data?.retailers?.[p.retailerId];
  const exactIdentity=p.mpn?!!component?.mpn&&p.mpn===component.mpn:
   !component?.mpn&&typeof p.ean==='string'&&/^\d{13}$/.test(p.ean)&&p.ean===component?.ean;
  if(p.retailerId!=='amazonUK'||!retailer||p.identityVerified!==true||!exactIdentity||!/^B[A-Z0-9]{9}$/.test(p.asin)||retailer.tag!=='buildwithcore-21')return [];
  return [{name:retailer.name,url:'https://www.amazon.co.uk/dp/'+p.asin+'?tag='+encodeURIComponent(retailer.tag)}];
 });
}
return {catalogue,links};
});
