class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.feelsLike = document.getElementById("w-feels-like");
    this.minTemp = document.getElementById("w-min-temp");
    this.maxTemp = document.getElementById("w-max-temp");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].main;
    this.string.textContent = +weather.main.temp - 273.15 + " °C";
    this.icon.setAttribute(
      "src",
      `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Realtive Humidity: ${weather.main.humidity}%`;
    this.feelsLike.textContent = `Feels Like: ${
      +weather.main.feels_like - 273.15
    } °C`;
    this.minTemp.textContent = `Min Temperature: ${
      +weather.main.temp_min - 273.15
    } °C`;
    this.maxTemp.textContent = `Max Temperature: ${
      +weather.main.temp_max - 273.15
    } °C`;
    this.wind.textContent = `Wind: ${weather.wind.speed} m/sec`;
  }
}

// -273.15
// meter/sec
// %
// pressure hPa
