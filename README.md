# Finnish Electricity Consumer Prices API

This API shows the electricity consumer prices in Finland. The data is extracted for educational/research purpose only.The goal of making this api is to visualize and extract important data for electricity consumers. It can also help the consumer of electricity to control the uses of electricity.

## Routes

App will be running on http://localhost:5000

1. GET /api/today
 Data: current day 24 hours prices,current hour price, next hour price
 today summary (avg,max,min)

2. GET /api/dayahead
 Data: 24 hours dayahead prices and summary (min,max,Avg)
 Note: Sometimes data is unavailable for some hours

3. GET /api/daily?date=yyyy-mm-dd
Data: get any data with date query last two years

## Data source
1. Market data:
https://www.nordpoolgroup.com/en/Market-data1/#/nordic/table

2. In terms of using this data in website follow the terms and condition,
 https://www.nordpoolgroup.com/en/About-us/Terms-and-conditions-for-use/

3. unofficial npm client
 https://github.com/samuelmr/nordpool-node




