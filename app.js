const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  var city = req.body.city;
  var key = "b3305820c7eedb5ceb5e2dda94f32b39";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    key +
    "&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      var temperature = weatherData.main.temp;
      var description = weatherData.weather[0].description;
      var iconId = weatherData.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
      console.log(iconURL);
      console.log(temperature);
      console.log(description);

      res.write(
        "<p>The temperature is: " + temperature + "degrees celcius </p>"
      );
      res.write("<h1>The weather descirption is : " + description + "</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function (req, res) {
  console.log("server is running");
});
