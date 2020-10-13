const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res) {

	let appid = "b93dc3fee15b8979cba906243aec856c";
	let cityName = "Hanoi";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}`;
	
	https.get(url, (response) => {
		
		console.log(response);
	});

});


app.listen(3000, function() {
	console.log("Server is running on port 3000.");
});
