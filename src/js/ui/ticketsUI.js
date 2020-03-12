import currencyUI from "./currencyUI";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-section");
    this.currencyLogo = currency.getCurrencyLogo.bind(currency);
  }

  /**
   * Получение разметки пустого контейнера авиабилетов.
   * @returns {string} - html-разметка.
   */
  static emptyMsgTemplate() {
    return `<div class="not-tickets-block">По вашему запросу билетов не найдено.</div>`;
  }

  /**
   * Получение разметки карточки авиабилета.
   * @returns {string} - html-разметка.
   */
  static ticketTemplate(ticket, currency) {
    return `<div class="col s12 m6 mx-auto">
    <div class="card">
      <div class="card-content">
        <div class="card-content-airlines d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            alt="${ticket.airline_name}"
            class="logo-airlines"
          />
          <span class="card-title">${ticket.airline_name}</span>
        </div>
        <div class="card-content-destination d-flex">
          <div class="city-origin mr-auto">
            <i class="material-icons">flight_takeoff</i
            ><span>${ticket.origin_name}</span>
          </div>
          <div class="city-destination ml-auto">
            <i class="material-icons">flight_land</i><span>${ticket.destination_name}</span>
          </div>
        </div>
        <div class="card-content-info d-flex align-items-start">
          <div class="card-flight d-flex flex-direction-column">
            <span class="card-date-time">Вылет: ${ticket.departure_at}</span>
            <span class="card-date-time">Обратно: ${ticket.return_at}</span>
            <span class="card-transfer">Пересадок: ${ticket.transfers}</span>
            <span class="card-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
          <div class="card-price ml-auto pink darken-4">${currency} ${ticket.price}</div>
        </div>
        <div class="card-content-btn ml-auto"><a class="waves-effect waves-light btn #2e7d32 green darken-3"
        data-airline_logo="${ticket.airline_logo}"
        data-airline_name="${ticket.airline_name}"
        data-origin_name="${ticket.origin_name}"
        data-destination_name="${ticket.destination_name}"
        data-departure_at="${ticket.departure_at}"
        data-return_at="${ticket.return_at}"
        data-transfers="${ticket.transfers}"
        data-flight_number="${ticket.flight_number}"
        data-currency="${currency}"
        data-price="${ticket.price}"
        >В корзину</a></div>
      </div>
    </div>
  </div>`;
  }

  /**
   * Очистка контейнера авиабилетов.
   */
  clearContainer() {
    this.container.innerHTML = "";
  }

  /**
   * Вставка разметки пустого контейнера авиабилетов в DOM.
   */
  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  /**
   * Рендеринг контента контейнера авиабилетов.
   * @param {array} tickets - массив объектов авиабилетов.
   */
  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }
    let fragment = "";
    const currency = this.currencyLogo();
    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
