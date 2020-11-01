class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.feelsLike = document.getElementById("w-feels-like");
    this.minTemp = document.getElementById("w-mim-temp");
    this.maxTemp = document.getElementById("w-max-temp");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {}
}

// -273.15
// meter/sec
// %
// pressure hPa
