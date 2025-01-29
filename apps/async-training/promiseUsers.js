const axios = require("axios");
const fs = require("fs").promises;

axios
  .get("https://reqres.in/api/users")
  .then((response) => {
    console.log("Parsing Body");
    const payload = response.data.data;
    let users = "id, email, first_name, last_name, avatar\n";
    payload.forEach((user) => {
      users += `${user["id"]}, ${user["email"]}, ${user["first_name"]}, ${user["last_name"]}, ${user["avatar"]}\n`;
    });
    return fs.writeFile("promise_users.csv", users);
  })
  .then(() => {
    console.log("File written successfully to promise_users.csv");
  })
  .catch((error) => {
    console.error(`Could not sent request to api: ${error.message}`);
  });
