import { nordpool } from "nordpool";
import { dateFormatter,timeFormatter } from './dateTimeFormatter.js';

const prices = new nordpool.Prices();

//get last 30 days
const getDateArray = (start, end)=> {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() +1);
    }
    return arr;
}
const endDate = new Date();
const startDate = new Date();
startDate.setDate(startDate.getDate() - 30);
const dateArr = getDateArray(startDate,endDate);

//change date format
const dateformat=()=>{
  const allDate=[]
   for (let i = 0; i < dateArr.length; i++) {
    const date= dateFormatter(dateArr[i])
       allDate.push(date);
   }
   return allDate;
}

const dailyPrices = async() => {
  const dates = dateformat();
  const allResults = [];
  for (let i = 0; i < dates.length; i++) {
    const ldate = dates[i];
    const results = await prices.hourly({ area: "FI", from: ldate });
    const final=results?.map(data => {
    const alldata={...data};
    let price;
    if (!isNaN(alldata.value)& alldata.value>0){
      price = (Math.round(alldata.value * 1.24 * 100) / 1000).toFixed(2);
    }
    else{
      price=null;
    }
    const time=timeFormatter(alldata.date)
    const dailyPrice = {
      date: ldate,
      time: time,
      price: price
    };
    allResults.push(dailyPrice);
    })
  }
  return allResults;
}
export default dailyPrices;
