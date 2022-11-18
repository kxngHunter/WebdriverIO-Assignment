const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get stepOnePageTitle() {
    return $("li[id='shipping'] div[class='step-title']");
  }
  get inputFirstName() {
    return $("input[name='firstname']");
  }
  get inputLastName() {
    return $("input[name='lastname']");
  }
  get inputAddress() {
    return $("input[name='street[0]']");
  }
  get inputCity() {
    return $("input[name='city']");
  }
  get selectState() {
    return $("select[name='region_id']");
  }
  get stateOptions() {
    return $$("select[name='region_id'] option");
  }
  get inputZip() {
    return $("input[name='postcode']");
  }
  get selectCountry() {
    return $("select[name='country_id']");
  }
  get countryOptions() {
    return $$("select[name='country_id'] option");
  }
  get inputPhone() {
    return $("input[name='telephone']");
  }
  get inputShippingMethod() {
    return $("input[value='tablerate_bestway']");
  }
  get btnNext() {
    return $(".button.action.continue.primary");
  }
  get btnSubmit() {
    return $("button[title='Place Order']");
  }
  get confirmation() {
    return $("span[data-ui-id='page-title-wrapper']");
  }
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async fillShippingInfo(input) {
    await this.inputFirstName.setValue(input.firstName);
    await this.inputLastName.setValue(input.lastName);
    await this.inputAddress.setValue(input.address);
    await this.inputCity.setValue(input.city);
    await this.selectState.selectByAttribute("value", "1");
    await this.inputZip.setValue(input.zip);
    await this.selectCountry.selectByAttribute("value", "US");
    await this.inputPhone.setValue(input.phoneNumber);
    await this.inputShippingMethod.click();
    await this.btnNext.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  // open() {
  //   return super.open("customer/account/create/");
  // }
}

module.exports = new CheckoutPage();
