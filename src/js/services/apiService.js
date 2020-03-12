import axios from "axios";
import config from "../config/apiConfig";

class Api {
  constructor(config) {
    this.url = config.url;
  }

  /**
   * Запрос списка стран от сервера.
   * @returns {array} - массив объектов с данными.
   */
  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  /**
   * Запрос списка городов от сервера.
   * @returns {array} - массив объектов с данными.
   */
  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  /**
   * Запрос авиабилетов с ценами от сервера .
   * @param {object} params - объект с параметрами для запроса.
   * @returns {object} - объект с данными или ошибкой.
   */
  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  /**
   * Запрос списка авиакомпаний от сервера.
   * @returns {array} - массив объектов с данными.
   */
  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

const api = new Api(config);

export default api;
