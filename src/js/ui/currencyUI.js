class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.logo = {
      USD: "$",
      EUR: "€"
    };
  }

  get currencyValue() {
    return this.currency.value;
  }

  getCurrencyLogo() {
    return this.logo[this.currency.value];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
