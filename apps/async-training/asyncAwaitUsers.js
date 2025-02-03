const axios = require("axios");
const fs = require("fs").promises;

const saveToFile = (data) => {
  return fs.writeFile(`${__dirname}/asyncAwaitUsers.csv`, data);
};

axios.defaults.baseURL = "https://reqres.in";

const saveUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    const users = formatData(response.data.data);
    await saveToFile(users);
    console.log("File written successfully to asyncAwaitUsers.csv");
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    throw error;
  }
};

const formatData = (data) => {
  let users = "id, email, first_name, last_name, avatar\n";
  data.forEach((user) => {
    users += `${user["id"]}, ${user["email"]}, ${user["first_name"]}, ${user["last_name"]}, ${user["avatar"]}\n`;
  });
  return users;
};

module.exports = { saveUsers };
