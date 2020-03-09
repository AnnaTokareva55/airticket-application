import api from "../services/apiService";
import { formatDate } from "../helpers/date";

class State {
  constructor(api, helpers) {
    this.api = api;
    this.formatDate = helpers.formatDate;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
    this.lastSearch = null;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.conversionCountries(countries);
    this.cities = this.conversionCities(cities);
    this.airlines = this.conversionAirlines(airlines);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    return response;
  }

  conversionCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  conversionCities(cities) {
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name} (${country_name})`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name
      };
      return acc;
    }, {});
  }

  conversionAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
      airline.name = airline.name || airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  conversationTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, `dd MMM yyyy hh:mm`),
        return_at: this.formatDate(ticket.return_at, `dd MMM yyyy hh:mm`)
      };
    });
  }

  createShortCitiesList(cities) {
    return Object.values(cities).reduce((acc, value) => {
      acc[value.full_name] = null;
      return acc;
    }, {});
  }

  getCoyntryNameByCode(country_code) {
    return this.countries[country_code].name;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      city => city.full_name === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.conversationTickets(response.data);
  }
}

const state = new State(api, { formatDate });

export default state;
