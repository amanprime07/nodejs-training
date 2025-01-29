const Todos = require("./index");
const assert = require("assert").strict;
const fs = require("fs");

describe("should be able to add and complete todos", () => {
  test("should be able to add todo", () => {
    let todo = new Todos();
    todo.add("Buy milk");
    assert.strictEqual(todo.todos.length, 1);
    assert.equal(todo.todos[0].title, "Buy milk");
  });

  test("should be able to list todos", () => {
    let todo = new Todos();
    todo.add("Buy milk");
    todo.add("Buy eggs");
    assert.deepEqual(todo.list(), [
      { title: "Buy milk", completed: false },
      { title: "Buy eggs", completed: false },
    ]);
  });

  test("should be able to complete todo", () => {
    let todo = new Todos();
    todo.add("Buy milk");
    todo.complete("Buy milk");
    assert.equal(todo.todos[0].completed, true);
  });

  test("should throw error if todo not found", () => {
    let todo = new Todos();
    todo.add("Buy milk");
    assert.throws(
      () => {
        todo.complete("Buy eggs");
      },
      (err) => {
        if (err instanceof Error && err.message === "Todo not found") {
          return true;
        }
      }
    );
  });
});

describe("should be able to save todos to file", () => {
  beforeEach(() => {
    this.todo = new Todos();
    this.todo.add("Buy milk");
  });

  afterEach(() => {
    if (fs.existsSync("todos.csv")) {
      fs.unlinkSync("todos.csv");
    }
  });

  test("should save single todos to file promise", () => {
    return this.todo.saveToFilePromise().then(() => {
      assert.equal(fs.existsSync("todos.csv"), true);
      const data = fs.readFileSync("todos.csv", "utf-8").toString();
      assert.equal(data, "Title,Completed\nBuy milk,false\n");
    });
  });

  test("should save single todos to file async / await", async () => {
    await this.todo.saveToFilePromise();
    assert.equal(fs.existsSync("todos.csv"), true);
    const data = fs.readFileSync("todos.csv", "utf-8").toString();
    assert.equal(data, "Title,Completed\nBuy milk,false\n");
  });

  test("should save completed todos to file", async () => {
    let todo = new Todos();
    todo.add("Buy milk");
    todo.complete("Buy milk");
    await todo.saveToFilePromise();
    assert.equal(fs.existsSync("todos.csv"), true);
    const data = fs.readFileSync("todos.csv", "utf-8").toString();
    assert.equal(data, "Title,Completed\nBuy milk,true\n");
  });
});
