// Init Weather
const weather = new Weather("Jalal-Abad", "KG");

// Init UI
const ui = new UI();

// Event to load wheather when web-site is loaded
document.addEventListener("DOMContentLoaded", getWeather);

// Event to change location
document.getElementById("w-change-btn").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  weather.changeLocation(city, country);

  getWeather();

  // Close Modal
  $("#locModal").modal("hide");
});

// Event to get and display weather
function getWeather() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
    })
    .catch((err) => console.log(err));
}
