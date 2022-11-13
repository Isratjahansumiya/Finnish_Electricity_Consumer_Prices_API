import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {getPricesByDate} from './consumerPrices/pricesByDate.js'
import {
  dateFormatter,
  timeFormatter,
} from './consumerPrices/dateTimeFormatter.js';
import {summaryCalculation} from './consumerPrices/summaryCalculation.js'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api', (req, res) => {
  res.send('Hello World!');
});
/**
 * Example of the api/today
 * estimated avg running time < 2s
 */
app.get('/api/today', async (req, res) => {
  const todayDate = dateFormatter(new Date());
 const tomorrowDate = dateFormatter(
    new Date().setDate(new Date().getDate() + 1)
  );
  const todayPrices = await getPricesByDate(todayDate);
  const currentHour = timeFormatter(new Date());
  let currentHourPrice = '',
    nextHourPrice = '';
  for (let i = 0; i < todayPrices.length; ++i) {
    if (todayPrices[i].time.split(':')[0] === currentHour.split(':')[0]) {
      currentHourPrice = todayPrices[i];
      if (i < todayPrices.length - 1) {
        nextHourPrice = todayPrices[i + 1];
      }
      break;
    }
  }

  // calculate the summary by using the result from todayPrices
  let summary = summaryCalculation(todayPrices);
  res.json({
    todayPrices: todayPrices,
    currentPrice: currentHourPrice,
    nextHourPrice: nextHourPrice,
    todaySummary: summary,
    priceUnit: 'snt/kWh',
  });
});

/**
 * Example of the api/dayahead
 * estimated avg running time < 2s
 */
app.get('/api/dayahead', async (req, res) => {
  const tomorrowDate = dateFormatter(
    new Date().setDate(new Date().getDate() + 1)
  );
  const dayAheadPrices = await getPricesByDate(tomorrowDate);
  const summary = summaryCalculation(dayAheadPrices);
  res.json({
    dayAheadPrices: dayAheadPrices,
    priceUnit: 'snt/kWh',
    dayAheadSummary: summary,
  });
});

app.get('/api/daily', async (req, res) => {
  const requestDate = req.query.date;
  const dailyPricesPerHour = await getPricesByDate(requestDate);
  if (requestDate) {
    res.json({ dailyPricesPerHour });
  } else {
    res.json({ tester: 100 });
  }
});
app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
    if (process.env.NODE_ENV === 'development') {
      console.log('http://localhost:' + PORT);
    }
  } else console.log("Error occurred, server can't start", error);
});

export default app;
