import { getAvgValue } from './helpers.js';
import todayConsumerPrices from './today.js';

const todaySummary = async () => {
  const todayPrices = await todayConsumerPrices();
  const today = todayPrices.map((tp) => {
    const allprice = tp.price;
    return allprice;
  });
  //const summary = [];
  const priceSummary = {
    min: Math.min(...today).toString(),
    max: Math.max(...today).toString(),
    avg: getAvgValue(today),
  };
  //summary.push(priceSummary);
  return priceSummary;
};
export default todaySummary;
