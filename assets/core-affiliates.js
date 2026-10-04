/* Editorially verified destinations only. No prices, stock or purchasing evidence. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.CoreAffiliates=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const catalogue={
 retailers:{amazonUK:{name:'Amazon',tag:'buildwithcore-21'}},
 products:{ryzen9600x:[{retailerId:'amazonUK',mpn:'100-100001405WOF',asin:'B0D6NN6TM7',identityVerified:true,verificationNote:'Exact Ryzen 5 9600X destination supplied and successfully tested by the project owner.'}]}
};
// Fail closed for unknown components, changed MPNs, unverified identities or invalid ASINs.
function links(componentId,component,data=catalogue){
 return (data?.products?.[componentId]||[]).flatMap(p=>{
  const retailer=data?.retailers?.[p.retailerId];
  if(p.retailerId!=='amazonUK'||!retailer||p.identityVerified!==true||!component?.mpn||p.mpn!==component.mpn||!/^B[A-Z0-9]{9}$/.test(p.asin)||retailer.tag!=='buildwithcore-21')return [];
  return [{name:retailer.name,url:'https://www.amazon.co.uk/dp/'+p.asin+'?tag='+encodeURIComponent(retailer.tag)}];
 });
}
return {catalogue,links};
});
