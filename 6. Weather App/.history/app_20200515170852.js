// Init Weather
const weather = new Weather("Jalab Abad", "KG");

// Init UI
const ui = new UI();

// Event to load wheather when web-site is loaded
document.addEventListener("DOMContentLoaded", getWeather);

function getWeather() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
      console.log(results);
    })
    .catch((err) => console.log(err));
}
