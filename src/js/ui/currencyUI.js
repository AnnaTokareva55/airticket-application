class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.logo = {
      USD: "$",
      EUR: "€"
    };
  }

  /**
   * Получение названия валюты, выбранной пользователем на странице.
   * @returns {string} - выбранная валюта.
   */
  get currencyValue() {
    return this.currency.value;
  }

  /**
   * Получение логотипа для выбранной валюты из словаря.
   * @returns {string} - логотип.
   */
  getCurrencyLogo() {
    return this.logo[this.currency.value];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
