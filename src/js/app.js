import "../css/style.css";
import "./plugins";
import state from "./store/state";
import stateBasket from "./store/stateBasket";
import formUI from "./ui/formUI";
import currencyUI from "./ui/currencyUI";
import ticketsUI from "./ui/ticketsUI";
import basketUI from "./ui/basketUI";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  form.addEventListener("submit", event => {
    event.preventDefault();
    onFormSubmit();
  });

  /**
   * Инициация приложения (state, полей с автозаполнением в форме и корзины).
   */
  async function initApp() {
    await state.init();
    formUI.setAutocompleteData(state.shortCitiesList);
    basketInit();
  }

  /**
   * Инициация корзины (загрузка содержимого корзины и рендеринг контейнера для нее).
   */
  function basketInit() {
    basketUI.renderBasket(stateBasket.tickets);
    const removeBasketButtons = document.querySelectorAll(".basket-remove-btn");
    removeBasketButtons.forEach(button =>
      button.addEventListener("click", event => {
        event.preventDefault();
        removeTicketFromBasket(event);
      })
    );
  }

  /**
   * Обработчик события клика по кнопке добавления билета в корзину.
   * @param {object} event - объект события.
   */
  function addToBasket(event) {
    const {
      airline_logo,
      airline_name,
      origin_name,
      destination_name,
      departure_at,
      return_at,
      transfers,
      flight_number,
      currency,
      price
    } = event.target.dataset;

    stateBasket.addTicketToBasket({
      airline_logo,
      airline_name,
      origin_name,
      destination_name,
      departure_at,
      return_at,
      transfers,
      flight_number,
      currency,
      price
    });
    basketInit();
    basketUI.showAddMsg();
  }

  /**
   * Обработчик события клика по кнопке удаления билета из корзины.
   * @param {object} event - объект события.
   */
  function removeTicketFromBasket(event) {
    const { id_ticket } = event.target.dataset;
    stateBasket.removeTicketFromBasket(id_ticket);
    basketInit();
    basketUI.showRemoveMsg();
  }

  /**
   * Обработчик события отправки формы для поиска билетов.
   */
  async function onFormSubmit() {
    const origin = state.getCityCodeByKey(formUI.originValue);
    const destination = state.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await state.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(state.lastSearch);
    const addBasketButtons = document.querySelectorAll(".card-content-btn");
    addBasketButtons.forEach(button =>
      button.addEventListener("click", event => addToBasket(event))
    );
  }
});
