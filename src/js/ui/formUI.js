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

  getForm() {
    return this.form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDate.value;
  }

  get returnDateValue() {
    return this.returnDate.value;
  }

  setAutocompleteData(data) {
    this.originInstance.updateData(data);
    this.destinationInstance.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
