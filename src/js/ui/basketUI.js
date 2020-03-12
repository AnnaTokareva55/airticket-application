class BasketUI {
  constructor() {
    this.container = document.getElementById("dropdown1");
  }

  /**
   * Получение разметки пустой корзины.
   * @returns {string} - шаблон разметки.
   */
  static emptyBasketTemplate() {
    return `<li><div class="empty-basket-block">В корзине нет билетов.</div></li>`;
  }

  /**
   * Получение html-разметки одного элемента списка авиабилетов в корзине.
   * @param {object} ticket - объект авиабилета.
   * @returns {string} - разметка элемента списка.
   */
  static basketTicketTemplate(ticket) {
    return `<li>
    <div class="basket-ticket d-flex flex-direction-column">
      <div class="basket-ticket-destination d-flex align-items-center">
        <img
          src="${ticket.airline_logo}"
          alt="${ticket.airline_name}"
          class="basket-ticket-logo-airlines"
        />
        <div class="d-flex align-items-center mr-auto">
          <span>${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center ml-auto">
          <i class="medium material-icons">flight_land</i>
          <span>${ticket.destination_name}</span>
        </div>
      </div>
      <div class="basket-ticket-info d-flex flex-direction-column">
        <div class="basket-ticket-add-info d-flex align-items-center">
          <div class="basket-ticket-time-flight d-flex flex-direction-column">
            <span class="basket-ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
          <div class="d-flex flex-direction-column align-items-end">
          <span class="basket-ticket-price pink darken-4">${ticket.currency} ${ticket.price}</span>
          <div class="basket-remove">
          <a
            class="waves-effect waves-light btn-small #ff1744 red accent-3 basket-remove-btn"
            data-id_ticket="${ticket.id}"
            >Удалить</a
          >
        </div>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  }

  /**
   * Очистка контейнера.
   */
  clearContainer() {
    this.container.innerHTML = "";
  }

  /**
   * Добавление разметки пустой карзины в DOM.
   */
  showEmptyBasket() {
    const template = BasketUI.emptyBasketTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  /**
   * Рендеринг контента для контейнера корзины.
   * @param {object} tickets - объект объектов авиабилетов.
   */
  renderBasket(tickets) {
    this.clearContainer();
    const ticketsArr = Object.values(tickets);
    if (!ticketsArr.length) {
      this.showEmptyBasket();
      return;
    }
    let fragment = "";
    ticketsArr.forEach(ticket => {
      const template = BasketUI.basketTicketTemplate(ticket);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  /**
   * Вывод оповещения о добавлении билета в корзину.
   */
  showAddMsg() {
    const msg = "Билет добавлен в корзину.";
    M.toast({ html: msg, classes: "#43a047 green darken-1" });
  }

  /**
   * Вывод оповещения об удалении билета из корзины.
   */
  showRemoveMsg() {
    const msg = "Билет удален из корзины.";
    M.toast({ html: msg, classes: "#ff1744 red accent-2" });
  }
}

const basketUI = new BasketUI();

export default basketUI;
