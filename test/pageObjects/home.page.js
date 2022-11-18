const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get contentHeading() {
    return $(".content-heading>h2");
  }
  get productLink() {
    return $(`.product-item:first-child a.product-item-link`);
  }
  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

module.exports = new HomePage();
