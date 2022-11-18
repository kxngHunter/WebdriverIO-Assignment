const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
  /**
   * define selectors using getter methods
   */
  get pageTitle() {
    return $(".page-title>span");
  }
  get firstProduct() {
    return $(".product-item:first-child");
  }

  get productLink() {
    return $(`.product-item:first-child a.product-item-link`);
  }
  get productSizes() {
    return $$(".swatch-option.text");
  }
  get productColors() {
    return $$(".swatch-option.color");
  }
  get productQuantity() {
    return $("#qty");
  }
  get addToCartButton() {
    return $("#product-addtocart-button");
  }
  get cartCounter() {
    return $("span.counter-number");
  }
  get cart() {
    return $(`a[data-bind="scope: 'minicart_content'"]`);
  }
  get cartProductTitles() {
    return $$("#mini-cart li .product-item-name>a");
  }
  get checkoutButton() {
    return $("#top-cart-btn-checkout");
  }
  /**
   * overwrite specific options to adapt it to page object
   */
  // open() {
  //   return super.open("");
  // }
}

module.exports = new ProductPage();
