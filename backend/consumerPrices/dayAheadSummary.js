import dayAheadConsumerPrices from './dayAhead.js';
import { getAvgValue } from './helpers.js';

const dayaheadSummary = async () => {
  const nextdayPrices = await dayAheadConsumerPrices();
  const nextday = nextdayPrices.map((np) => {
    const allprice = np.price;
    return allprice;
  });
  const priceSummary = {
    min: Math.min(...nextday),
    max: Math.max(...nextday),
    avg: getAvgValue(nextday),
  };
  return priceSummary;
};
export default dayaheadSummary;
