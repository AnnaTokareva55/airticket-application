import {
  getAutocompleteInstance,
  getDatePickerInstance
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this.form = document.getElementById("stateControls");
    this.origin = document.getElementById("origin");
    this.destination = document.getElementById("destination");
    this.departDate = document.getElementById("depart-date");
    this.returnDate = document.getElementById("return-date");
    this.originInstance = autocompleteInstance(this.origin);
    this.destinationInstance = autocompleteInstance(this.destination);
    this.departDateInstance = datePickerInstance(this.departDate);
    this.returnDateInstance = datePickerInstance(this.returnDate);
  }

  /**
   * Получение html-элемента формы из DOM.
   * @returns {object}
   */
  getForm() {
    return this.form;
  }

  /**
   * Получение города вылета.
   * @returns {string} - название города, выбранного пользователем.
   */
  get originValue() {
    return this.origin.value;
  }

  /**
   * Получение города прибытия.
   * @returns {string} - название города, выбранного пользователем.
   */
  get destinationValue() {
    return this.destination.value;
  }

  /**
   * Получение даты вылета.
   * @returns {string} - дата, введенная пользователем.
   */
  get departDateValue() {
    return this.departDate.value;
  }

  /**
   * Получение даты возврата.
   * @returns {string} - дата, введенная пользователем.
   */
  get returnDateValue() {
    return this.returnDate.value;
  }

  /**
   * Установка данных для полей с автокомплитом.
   * @param {object} data - объект с содержимым для автозаполнения (город + страна).
   */
  setAutocompleteData(data) {
    this.originInstance.updateData(data);
    this.destinationInstance.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
