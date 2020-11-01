class Weather {
  constructor(city, country) {
    this.key = "90747351532d624a298c70a49c578dea";
    this.city = city;
    this.country = country;
  }

  async getWeather() {
    const response = await fetch(
      `api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`
    );

    const resData = response.json();

    return resData;
  }

  changeLocation(city, country) {
    this.city = city;
    this.country = country;
  }
}
