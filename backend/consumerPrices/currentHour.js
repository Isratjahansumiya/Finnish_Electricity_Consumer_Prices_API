import { nordpool } from 'nordpool';
import {dateFormatter,timeFormatter } from "./dateTimeFormatter.js";

const prices = new nordpool.Prices();

const currentConsumerPrice = async () => {
  const results = await prices.at({ area: 'FI' });
  const price = Math.round(results.value * 1.24 * 100) / 1000;
  const date = dateFormatter(results.date);
  const time = timeFormatter(results.date);
  const currentPrice={
    date:date,
    time:time,
    price:price.toFixed(2),
  }
  return currentPrice;
};
export default currentConsumerPrice;
