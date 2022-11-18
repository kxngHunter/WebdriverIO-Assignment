/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  get profileDropDown() {
    return $(".action.switch");
  }
  get signOutButton() {
    return $(".authorization-link>a");
  }
  async signOut() {
    await browser.pause(3000);
    await this.profileDropDown.waitForDisplayed({ timeout: 3000 });
    await this.profileDropDown.click();
    if (await this.signOutButton.isDisplayed()) {
      await this.signOutButton.click();
    }
  }
  open(path) {
    return browser.url(`https://magento.softwaretestingboard.com/${path}`);
  }
};
