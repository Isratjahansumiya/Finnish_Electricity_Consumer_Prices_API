import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import todayConsumerPrices from './consumerPrices/today.js';
import dayAheadConsumerPrices from './consumerPrices/dayAhead.js';
import currentConsumerPrice from './consumerPrices/currentHour.js';
import todaySummary from './consumerPrices/todaySummary.js';
import dayaheadSummary from './consumerPrices/dayAheadSummary.js';
import nextHourPrice from './consumerPrices/nextHour.js';
import { priceUnit } from './consumerPrices/helpers.js';
import dailyPrices from './consumerPrices/daily.js';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
  })
);
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api', (req, res) => {
  res.send('Hello World!');
});
app.get('/api/today', async (req, res) => {
  const todayPrices = await todayConsumerPrices();
  const currentPrice = await currentConsumerPrice();
  const nexthourPrice = await nextHourPrice();
  const todaysummary = await todaySummary();
  res.json({
    todayPrices,
    currentPrice,
    nexthourPrice,
    todaysummary,
    priceUnit
  });
});
app.get('/api/dayahead', async (req, res) => {
  const dayaheadPrices = await dayAheadConsumerPrices();
  const nextdaysummary = await dayaheadSummary();
  res.json({dayaheadPrices,priceUnit,nextdaysummary});
});
app.get('/api/daily', async (req, res) => {
  const dailyPricesPerHour=await dailyPrices();
  const requestDate = req.query.date;
  if (requestDate) {
    const requestedData = dailyPricesPerHour.filter((d) => {
      return d.date === requestDate;
    });
    res.json({ requestedData, priceUnit });
  } else {
    res.json({ dailyPricesPerHour, priceUnit });
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
