import { nordpool } from 'nordpool';
import {dateFormatter,timeFormatter } from './dateTimeFormatter.js'

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate=dateFormatter(tomorrow);
const prices = new nordpool.Prices();
const hourlyPrices = async (day) => {
  let results;
  try {
    if (day === 'nextday') {
      results = await prices.hourly({ area: 'FI', from: tomorrowDate });
    } else {
      results = await prices.hourly({ area: 'FI' });
    }

    const data = [];
    for (let i = 0; i < results.length; i++) {
      const dateNordphool = results[i].date;
      const price = (Math.round(results[i].value * 1.24 * 100) / 1000).toFixed(2);
      const date=dateFormatter(dateNordphool);
      const time=timeFormatter(dateNordphool);
      const consumerPrices = {
        date: date,
        time: time,
        price: price,
      };
      data.push(consumerPrices);
    }
    //console.log(data);
    return data;
  } catch (error) {
    return { Message: 'An error just happened' };
  }
};
export default hourlyPrices;
