const fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();
const filename = "data.json";
async function setupRegistrationData() {
  try {
    const email = process.env.EMAIL;
    const name = email.split("@")[0];
    const domain = email.split("@")[1];

    let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!reg.test(email)) {
      throw new Error("Email format is an incorrect");
    }
    const password = `Test${Date.now()}`;
    const registrationData = [
      {
        email: `${name}+${Date.now()}@${domain}`,
        password: password,
        confirmPassword: password,
        firstName: "Test",
        lastName: "Test",
        valid: true,
        city: "Test",
        address: "Test",
        zip: "00000",
        phoneNumber: "8761234567",
      },
      {
        email: `${name}+${Date.now()}@${domain}`,
        password: password,
        confirmPassword: password,
        firstName: "",
        lastName: "Test",
        valid: false,
        element: "#firstname-error",
      },
      {
        email: `${name}+${Date.now()}@${domain}`,
        password: password,
        confirmPassword: password,
        firstName: "Test",
        lastName: "",
        valid: false,
        element: "#lastname-error",
      },
      {
        email: ``,
        password: password,
        confirmPassword: password,
        firstName: "Test",
        lastName: "Test",
        valid: false,
        element: "#email_address-error",
      },
      {
        email: `${name}`,
        password: password,
        confirmPassword: password,
        firstName: "Test",
        lastName: "Test",
        valid: false,
        element: "#email_address-error",
      },
      {
        email: `${name}+${Date.now()}@${domain}`,
        password: password,
        confirmPassword: password + "123",
        firstName: "Test",
        lastName: "Test",
        valid: false,
        element: "#password-confirmation-error",
      },
    ];
    const file = await fs.readFile(filename);
    const data = JSON.parse(file);
    console.log(data);
    data.registrationData = registrationData;
    await fs.writeFile(filename, JSON.stringify(data, null, 4));
  } catch (error) {
    console.log(error);
  }
}
async function addLoginData(input) {
  try {
    const file = await fs.readFile(filename);
    const data = JSON.parse(file);
    console.log(data);
    data.loginData = input;
    await fs.writeFile(filename, JSON.stringify(data, null, 4));
  } catch (error) {
    console.log(error);
  }
}
async function getLoginData() {
  try {
    const file = await fs.readFile(filename);
    const data = JSON.parse(file);
    console.log(data);
    return data.loginData;
  } catch (error) {
    console.log(error);
  }
}
if (require.main === module) {
  setupRegistrationData();
}
module.exports = { addLoginData, getLoginData };
