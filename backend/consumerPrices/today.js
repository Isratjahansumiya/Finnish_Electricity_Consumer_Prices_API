import hourlyPrices from "./hourly.js"
const todayConsumerPrices= async () => {
  const data = await hourlyPrices();
  return data;
}
 export default todayConsumerPrices;