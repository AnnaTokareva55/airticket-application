import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

const datepicker = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepicker, {
  showClearBtn: true,
  format: "yyyy-mm"
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}

const dropdown = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropdown, { constrainWidth: false });

export function getDropdownInstance(elem) {
  return M.Dropdown.getInstance(elem);
}
