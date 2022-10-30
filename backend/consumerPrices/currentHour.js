import todayConsumerPrices from "./today.js"


const currentConsumerPrice = async () => {
  const d = new Date();
  let hour = d.getHours();
  const zeroMinuteHour = hour+ ":00"
  const todayPrices= await todayConsumerPrices();
  const currentPrice=todayPrices.filter(t=>t.time==zeroMinuteHour);
  return currentPrice;

};
export default currentConsumerPrice;
