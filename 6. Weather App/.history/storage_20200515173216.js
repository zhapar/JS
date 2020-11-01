class Storage {
  constructor() {
    this.city;
    this.country;
    this.defaultCity = "Jalal Abad";
    this.defaultCountry = "KG";
  }

  getLocation() {
    if (localStorage.getItem("city") === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem("city");
    }
    if (localStorage.getItem("country") === null) {
      this.country = this.defaultCountry;
    } else {
      this.country = localStorage.getItem("country");
    }
  }

  setLocation(city, country) {
    localStorage.setItem("city", city);
    localStorage.setItem("country", country);
  }
}
