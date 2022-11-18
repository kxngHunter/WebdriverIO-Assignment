const RegisterPage = require("../pageObjects/register.page");
const LoginPage = require("../pageObjects/login.page");
const HomePage = require("../pageObjects/home.page");
const ProductPage = require("../pageObjects/product.page");
const CheckoutPage = require("../pageObjects/checkout.page");
let data = require("../../data.json");
const { addLoginData, getLoginData } = require("../../dataHandler");
let productTitle;
let validInput = data.registrationData.find((data) => data.valid == true);
describe("Registration", () => {
  let reg = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  for (const formData of data.registrationData) {
    it("should register a new user with valid input", async () => {
      await RegisterPage.open();
      await RegisterPage.register(formData);
      if (formData.valid) {
        await expect(RegisterPage.pageTitle).toHaveTextContaining("My Account");
        await addLoginData(formData);
        await RegisterPage.signOut();
      } else {
        if (!(formData.firstName && formData.lastName)) {
          const element = await $(`${formData.element}`);
          await expect(element).toBeDisplayed();
          await expect(element).toHaveTextContaining(
            "This is a required field."
          );
        }
        if (!formData.email) {
          const element = await $(`${formData.element}`);
          await expect(element).toBeDisplayed();
          await expect(element).toHaveTextContaining(
            "This is a required field."
          );
        }
        if (formData.email && !reg.test(formData.email)) {
          const element = await $(`${formData.element}`);
          await expect(element).toBeDisplayed();
          await expect(element).toHaveTextContaining(
            "Please enter a valid email address (Ex: johndoe@domain.com)."
          );
        }
        if (!formData.password === formData.confirmPassword) {
          const element = await $(`${formData.element}`);
          await expect(element).toBeDisplayed();
          await expect(element).toHaveTextContaining(
            "Please enter the same value again."
          );
        }
      }
    });
  }
});
describe("Add To Cart", () => {
  before(async function () {
    if (!data.loginData) {
      await RegisterPage.open();
      await RegisterPage.register(validInput);
      await addLoginData(validInput);
      await RegisterPage.signOut({ wait: 3000 });
    }
    validInput = await getLoginData();
    console.log("Login Data: ", data.loginData);
    await LoginPage.open();
    await LoginPage.login(validInput.email, validInput.password);
    await expect(LoginPage.pageTitle).toHaveTextContaining("My Account");
  });
  it("should be on the home page", async () => {
    await browser.pause(3000);
    await HomePage.open();
    await expect(HomePage.contentHeading).toHaveTextContaining("Hot Sellers");
  });
  it("should find and open a product", async () => {
    await expect(HomePage.productLink).toBeExisting();
    const element = await HomePage.productLink;
    productTitle = await element.getText();
    await element.click();
    await browser.pause(2000);
    await expect(ProductPage.pageTitle).toHaveTextContaining(productTitle);
  });
  it("should add product to cart", async () => {
    let count = 0;
    if (await ProductPage.cartCounter.isExisting()) {
      count = Number(await ProductPage.cartCounter.getText());
    }
    const sizes = await ProductPage.productSizes;
    const colors = await ProductPage.productColors;
    if (sizes && sizes.length > 0) {
      await sizes[0].click();
      await expect(sizes[0]).toHaveElementClassContaining("selected");
    }
    if (colors && colors.length > 0) {
      await colors[0].click();
      await expect(colors[0]).toHaveElementClassContaining("selected");
    }

    await ProductPage.addToCartButton.click();
    await browser.pause(6000);
    await expect(ProductPage.cartCounter).toHaveText(`${count + 1}`);
    await ProductPage.cart.click();
    const cartItems = [];
    const items = await ProductPage.cartProductTitles;
    for (const item of items) {
      const title = await item.getText();
      cartItems.push(title);
    }
    const itemFound = cartItems.includes(productTitle);
    expect(itemFound).toEqual(true);
  });
});
describe("Checkout", () => {
  it("should go to the checkout", async () => {
    await ProductPage.checkoutButton.click();
    await browser.pause(3000);
    await expect(CheckoutPage.stepOnePageTitle).toHaveTextContaining(
      "Shipping Address"
    );
  });
  it("should fill out shipping info and checkout", async () => {
    const element = await $(".shipping-address-items");
    if (await element.isExisting()) {
      await CheckoutPage.inputShippingMethod.click();
      await CheckoutPage.btnNext.click();
    } else {
      await CheckoutPage.fillShippingInfo(validInput);
    }
    await browser.pause(10000);
    if (await CheckoutPage.confirmation.isExisting()) {
      await CheckoutPage.btnSubmit.click();
    }
    await browser.pause(10000);
    await expect(CheckoutPage.confirmation).toHaveTextContaining("Thank you", {
      ignoreCase: true,
    });
  });
});
