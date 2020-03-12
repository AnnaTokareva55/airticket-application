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

  /**
   * Загрузка необходимых данных с сервера и инициация state приложения.
   */
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

  /**
   * Преобразование массива стран, полученных от сервера, в объект.
   * @param {array} countries - массив стран.
   * @returns {object} - объект стран.
   */
  conversionCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  /**
   * Преобразование массива городов, полученных от сервера, в объект.
   * @param {array} cities - массив городов.
   * @returns {object} - объект городов.
   */
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

  /**
   * Преобразование массива авиакомпаний, полученных от сервера, в объект.
   * @param {array} airlines - массив авиакомпаний.
   * @returns {object} - объект авиакомпаний.
   */
  conversionAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
      airline.name = airline.name || airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  /**
   * Преобразование объекта авиабилетов в массив обектов с добавлением новых свойств каждому объекту в массиве.
   * @param {object} tickets - объект авиабилетов.
   * @returns {array} - массив авиабилетов.
   */
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

  /**
   * Формирование списка городов для полей с автозаполнением (вида "город + страна").
   * @param {object} cities - объект городов.
   * @returns {object} - объект для автокомлита.
   */
  createShortCitiesList(cities) {
    return Object.values(cities).reduce((acc, value) => {
      acc[value.full_name] = null;
      return acc;
    }, {});
  }

  /**
   * Получение названия страны по коду.
   * @param {string} country_code - код страны.
   * @returns {string} - название страны.
   */
  getCoyntryNameByCode(country_code) {
    return this.countries[country_code].name;
  }

  /**
   * Получение кода города по ключу.
   * @param {string} key - ключ для поиска города (вида "город + страна").
   * @returns {string} - код города.
   */
  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      city => city.full_name === key
    );
    return city.code;
  }

  /**
   * Получение названия города по коду.
   * @param {string} code - код города.
   * @returns {string} - название города.
   */
  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  /**
   * Получение названия авиакомпании по коду.
   * @param {string} code - код авиакомпании.
   * @returns {string} - название авиакомпании.
   */
  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  /**
   * Получение ссылки на логотип авиакомпании по коду.
   * @param {string} code - код авиакомпании.
   * @returns {string} - ссылка на логотип.
   */
  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  /**
   * Запрос списка авиабилетов с ценами от сервера.
   * @param {object} params - объект с параметрами для запроса.
   */
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.conversationTickets(response.data);
  }
}

const state = new State(api, { formatDate });

export default state;
