const functions = require("@google-cloud/functions-framework");
const axios = require("axios");

functions.http("weatherGET", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  axios
    .get("https://api.data.gov.sg/v1/environment/4-day-weather-forecast")
    .catch((err) => {
      res.send(err);
    })
    .then((result) => {
      res.send(result.data.items[0].forecasts.map((item) => item.forecast));
    });
});
