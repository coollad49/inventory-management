const got = require("got"); // if you don't have "got" - install it with "npm install got"
const fs = require("fs");
const FormData = require("form-data");

const apiKey = "acc_1f6f182e9a7b165";
const apiSecret = "47d9245688f6897ba730ef502e77aa5b";

const filePath = "/path/to/image.jpg";
const formData = new FormData();
formData.append("image", fs.createReadStream(filePath));

(async () => {
  try {
    const response = await got.post("https://api.imagga.com/v2/uploads", {
      body: formData,
      username: apiKey,
      password: apiSecret,
    });
    console.log(response.body);
  } catch (error) {
    console.log(error.response.body);
  }
})();
