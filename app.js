const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

	res.sendFile(__dirname + "/index.html");
	
});

app.post("/", function(req, res) {
	
	let appid = "b93dc3fee15b8979cba906243aec856c";
	let cityName = req.body.cityName;
	let units = "metric";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${appid}`;
	
	https.get(url, (response) => {
	
		console.log(response.statusCode);

		response.on("data", (data) => {
			
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon; 

			res.write("<h1>The temperature in" + cityName + " is " + temp + " degree Celcius.</h1>");
			res.write("<p>The weather is currently <em>" + description + "</em></p>");
			res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
			res.send();
		});
	});

});


app.listen(PORT, function() {
	console.log("Server is running on port " + PORT + "...");
});
