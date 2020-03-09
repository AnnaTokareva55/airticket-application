class StateBasket {
  constructor() {
    this.tickets = {
      0: {
        id: 0,
        airline_logo: "http://pics.avs.io/200/200/DP.png",
        airline_name: "Победа",
        origin_name: "Москва",
        destination_name: "Иркутск",
        departure_at: "09 Mar 2020 11:45",
        return_at: "13 Mar 2020 11:10",
        transfers: "0",
        flight_number: "453",
        currency: "$",
        price: "160"
      },
      1: {
        id: 1,
        airline_logo: "http://pics.avs.io/200/200/DP.png",
        airline_name: "Победа",
        origin_name: "Москва",
        destination_name: "Иркутск",
        departure_at: "09 Mar 2020 11:45",
        return_at: "13 Mar 2020 11:10",
        transfers: "0",
        flight_number: "453",
        currency: "$",
        price: "160"
      }
    };
  }

  addTicketToBasket(ticket) {
    const idTicket = Math.random();
    this.tickets = {
      ...this.tickets,
      [idTicket]: { ...ticket, id: idTicket }
    };
  }

  removeTicketFromBasket(idTicket) {
    delete this.tickets[idTicket];
  }
}

const stateBasket = new StateBasket();

export default stateBasket;
