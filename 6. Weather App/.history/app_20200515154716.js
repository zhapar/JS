const weather = new Weather("Bishkek", "kg");

// Event to load wheather when web-site is loaded
document.addEventListener("DOMContentLoaded", getWeather);

function getWeather() {
  weather
    .getWeather()
    .then((results) => console.log(results))
    .catch((err) => console.log(err));
}
