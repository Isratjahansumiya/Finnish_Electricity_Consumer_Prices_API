import hourlyPrices from "./hourly.js"

const dayAheadConsumerPrices = async () => {
  const data = await hourlyPrices("nextday");
  return data;
};
export default dayAheadConsumerPrices;
