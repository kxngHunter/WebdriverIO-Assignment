const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
  /**
   * define selectors using getter methods
   */
  get pageTitle() {
    return $(".page-title>span");
  }
  get inputFirstName() {
    return $("#firstname");
  }
  get inputLastName() {
    return $("#lastname");
  }
  get inputEmail() {
    return $("#email_address");
  }
  get inputPassword() {
    return $("#password");
  }
  get inputConfirmPassword() {
    return $("#password-confirmation");
  }
  get btnSubmit() {
    return $("button[title='Create an Account']");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async register(input) {
    await this.inputFirstName.setValue(input.firstName);
    await this.inputLastName.setValue(input.lastName);
    await this.inputEmail.setValue(input.email);
    await this.inputPassword.setValue(input.password);
    await this.inputConfirmPassword.setValue(input.confirmPassword);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("customer/account/create/");
  }
}

module.exports = new RegisterPage();
