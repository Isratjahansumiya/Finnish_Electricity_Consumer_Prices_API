import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todayConsumerPrices from "./consumerPrices/today.js";
import dayAheadConsumerPrices from "./consumerPrices/dayAhead.js";
import currentConsumerPrice from "./consumerPrices/currentHour.js";
import todaySummary from "./consumerPrices/todaySummary.js"
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/today", async (req, res) => {
  const todayPrices = await todayConsumerPrices();
  res.json({ todayPrices });

});
app.get("/api/dayahead", async (req, res) => {
  const dayaheadPrices = await dayAheadConsumerPrices();
  res.json({dayaheadPrices});
});
app.get("/api/now", async (req, res) => {
  const currentHourPrice = await currentConsumerPrice();
  res.json({currentHourPrice});
});

app.get("/api/today/summary", async (req, res)=>{
  const summary = await todaySummary();
  res.json({summary});

})

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
    if (process.env.NODE_ENV === "development") {
      console.log("http://localhost:" + PORT);
    }
  } else console.log("Error occurred, server can't start", error);
});
