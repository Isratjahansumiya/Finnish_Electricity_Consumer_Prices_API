import todayConsumerPrices from "./today.js";

const todaySummary = async () => {
  const todayPrices = await todayConsumerPrices();
  const today= todayPrices.map((tp) => {
    const allprice= tp.price;
    return allprice;
    });
  const avg = today.join("").length / today.length;
  const summary=[];
   const priceSummary = {
      min: Math.min(...today),
      max: Math.max(...today),
      avg: parseFloat(avg.toFixed(2)),
    };
    summary.push(priceSummary);
    return summary;
};
export default todaySummary;
