const axios = require("axios");
const saveUsers = require("./asyncAwaitUsers");
const fs = require("fs").promises;

jest.mock("axios");

const usersData = {
  data: [
    {
      id: 1,
      email: "test@abc.com",
      first_name: "test",
      last_name: "test",
      avatar: "test",
    },
  ],
};

describe("test async await save users", () => {
  test("should successfully write file", async () => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case "/api/users":
          return Promise.resolve({ data: usersData });
        case "/items.json":
          return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
        default:
          return Promise.reject(new Error("not found"));
      }
    });

    await saveUsers();

    let data = fs.readFile(`${__dirname}/asyncAwaitUsers.csv`, "utf-8");
    expect(data).resolve.toBe(
      "id, email, first_name, last_name, avatar\n1, test@abc.com, test, test, test\n"
    );
  });
});
