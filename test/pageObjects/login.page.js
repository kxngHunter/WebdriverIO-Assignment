const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get pageTitle() {
    return $(".page-title>span");
  }

  get inputEmail() {
    return $("#email");
  }

  get inputPassword() {
    return $("#pass");
  }

  get btnSubmit() {
    return $("button.action.login");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("customer/account/login/");
  }
}

module.exports = new LoginPage();
