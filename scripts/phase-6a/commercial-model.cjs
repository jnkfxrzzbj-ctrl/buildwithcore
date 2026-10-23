'use strict';
// Planning assumptions only. Never consumed by CORE's buying engine.
const assumptions={
 low:{visits:1000,clickRate:.08,conversion:.015,eligibleOrderValue:150,commission:.01,retained:.85,cashCost:10,hours:24,hourValue:15},
 central:{visits:5000,clickRate:.15,conversion:.03,eligibleOrderValue:250,commission:.02,retained:.90,cashCost:15,hours:32,hourValue:15},
 optimistic:{visits:15000,clickRate:.25,conversion:.05,eligibleOrderValue:350,commission:.03,retained:.95,cashCost:25,hours:40,hourValue:15}
};
function calculate(a){
 for(const k of ['visits','eligibleOrderValue','cashCost','hours','hourValue'])if(!Number.isFinite(a[k])||a[k]<0)throw Error('Invalid '+k);
 for(const k of ['clickRate','conversion','commission','retained'])if(!Number.isFinite(a[k])||a[k]<0||a[k]>1)throw Error('Invalid '+k);
 const clicks=a.visits*a.clickRate,orders=clicks*a.conversion,eligibleSales=orders*a.eligibleOrderValue;
 const gross=eligibleSales*a.commission,revenue=gross*a.retained;
 const revenuePerVisit=a.clickRate*a.conversion*a.eligibleOrderValue*a.commission*a.retained;
 return {clicks,orders,eligibleSales,gross,revenue,revenuePerVisit,cashSurplus:revenue-a.cashCost,timeCost:a.hours*a.hourValue,
  economicSurplus:revenue-a.cashCost-a.hours*a.hourValue,
  cashBreakEvenVisits:revenuePerVisit?Math.ceil(a.cashCost/revenuePerVisit):null,
  visitsFor250CashSurplus:revenuePerVisit?Math.ceil((250+a.cashCost)/revenuePerVisit):null};
}
if(require.main===module)console.log(JSON.stringify(Object.fromEntries(Object.entries(assumptions).map(([k,a])=>[k,{assumptions:a,results:calculate(a)}])),null,2));
module.exports={assumptions,calculate};
