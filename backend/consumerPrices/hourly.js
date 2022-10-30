import { nordpool } from "nordpool";
import dayjs from "dayjs";
import dayjsPluginUtc from "dayjs/plugin/utc.js";
import dayjsPluginTimezone from "dayjs/plugin/timezone.js";
dayjs.extend(dayjsPluginUtc); // Used by timezone
dayjs.extend(dayjsPluginTimezone); // Used to convert from one timezone to another

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate = dayjs
    .tz(tomorrow, "UTC")
    .tz("Europe/Helsinki")
    .format("YYYY-MM-DD");
//console.log(tomorrowDate);
const prices = new nordpool.Prices();
const hourlyPrices = async (day) => {
  let results;
  try {
    if(day=== "nextday"){
        results = await prices.hourly({area:"FI", from: tomorrowDate});
    }
    else{
        results = await prices.hourly({ area: "FI" });
    }

    const data = [];
    for (let i = 0; i < results.length; i++) {
      const dateNordphool = results[i].date;
      const price = Math.round(results[i].value * 1.24 * 100) / 1000;
      const date = dayjs
        .tz(dateNordphool, "UTC")
        .tz("Europe/Helsinki")
        .format("YYYY-MM-DD");
      const time = dayjs
        .tz(dateNordphool, "UTC")
        .tz("Europe/Helsinki")
        .format("H:mm");
      const consumerPrices = {
        date: date,
        time: time,
        price: price.toFixed(2),
      };
      data.push(consumerPrices);
    }
    //console.log(data);
    return data;
  } catch (error) {
    return{"Message":"An error just happened"};
  }
};
export default hourlyPrices;
