export const getAvgValue = (stringArr) => {
  let avg = stringArr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  if (!isNaN(avg) && stringArr.length > 0) {
    avg = (avg / stringArr.length).toFixed(2);
  } else {
    avg = null;
  }
  return avg;
};
export const priceUnit = { priceUnit: 'snt/kWh' };