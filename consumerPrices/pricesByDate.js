import { nordpool } from 'nordpool';
import {dateFormatter,timeFormatter } from './dateTimeFormatter.js'
const prices = new nordpool.Prices();


export const getPricesByDate = async (date) => {
  /**
   * this function get the 24-prices for any input date
   * date: in format : YYYY-MM-DD
   * prices: instance of nordPool.Prices()
   * */
  try {
    const results = await prices.hourly({
      area: 'FI',
      currency: 'EUR',
      date: `${date}`,
    });
    const modifedRes = [];
    for (let i = 0; i < results.length; i++) {
      const dateNordphool = results[i].date;
      let price;
      if (results[i].value!=null && results[i].value>0){
        price = (Math.round(results[i].value * 1.24 * 100) / 1000).toFixed(2);}
      else{
        price=null;
      }
      const date = dateFormatter(dateNordphool);
      const time = timeFormatter(dateNordphool);
      const consumerPrices = {
        date: date,
        time: time,
        price: price,
      };
      modifedRes.push(consumerPrices);
    }
    ///////////// ^^^
    return modifedRes;
  } catch (errors) {
    console.error(errors);
    return [];
  }
};
