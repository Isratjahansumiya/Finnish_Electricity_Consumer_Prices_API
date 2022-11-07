import todayConsumerPrices from './today.js';
const nextHourPrice = async () => {
  const d = new Date();
  let nexthour = d.getHours()+1;
  const zeroMinuteHour = nexthour + ':00';
  const todayPrices = await todayConsumerPrices();
  const nextPrice = todayPrices.filter((t) => t.time == zeroMinuteHour);
  const nextHPrice = { ...nextPrice };
  return nextHPrice[0];
};
export default nextHourPrice;
