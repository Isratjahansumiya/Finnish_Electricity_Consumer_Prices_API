export const summaryCalculation = (priceList) => {
  /**
   * this function return the summary for specific date
   * priceList: results from getPriceByDate
   */

  const prices = priceList.map((el, idx) => {
    return parseFloat(el.price);
  });
  let max = Math.max(...prices).toString();
  let min = Math.min(...prices).toString();
  let avg = (prices.reduce((sum, el) => sum + el, 0) / prices.length)
    .toFixed(2)
    .toString();
  return { max, min, avg };
};
