// Init Storage
const store = new Storage();

const loc = store.getLocation();

// Init Weather
const weather = new Weather(loc.city, loc.country);

// Init UI
const ui = new UI();

// Event to load wheather when web-site is loaded
document.addEventListener("DOMContentLoaded", getWeather);

// Event to change location
document.getElementById("w-change-btn").addEventListener("click", () => {
  const city = document.getElementById("city");
  const country = document.getElementById("country");

  weather.changeLocation(city.value, country.value);

  store.setLocation(city.value, country.value);

  getWeather();

  // Close Modal
  $("#locModal").modal("hide");

  city.value = "";
  country.value = "";
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
