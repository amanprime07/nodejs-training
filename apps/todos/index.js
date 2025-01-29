const fs = require('fs').promises;
class Todos {
  constructor() {
    this.todos = [];
  }

  list() {
    return [...this.todos];
  }

  add(title) {
    this.todos.push({
      title,
      completed: false,
    });
  }

  complete(title) {
    const todo = this.todos.find((todo) => todo.title === title);
    if (todo) {
      todo.completed = true;
    } else {
      throw new Error('Todo not found');
    }
  }

  saveToFilePromise() {
    let fileContent = "Title,Completed\n";
    this.todos.forEach((todo) => {
      fileContent += `${todo.title},${todo.completed}\n`;
    });
    return fs.writeFile('todos.csv', fileContent)
  }
}

module.exports = Todos;
