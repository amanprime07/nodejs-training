import { TodoDao } from "../dao/todo.dao";
import { NewTodo, UpdateTodo } from "../drizzle/schema";

const todoDao = new TodoDao();

export async function getTodos(query?: string | null, status?: string | null) {
  const todos = await todoDao.getAllTodos(status === "complete");
  return todos;
}

export async function createTodo(todo: NewTodo) {
  return await todoDao.insertTodo(todo);
}

export async function getTodo(id: number) {
  return await todoDao.getTodoById(id);
}

export async function updateTodo(id: number, updates: UpdateTodo) {
  const todo = await todoDao.getTodoById(id);
  if (!todo) {
    throw new Error(`No todo found for ${id}`);
  }
  await todoDao.updateTodoById(id, { ...todo, ...updates });
  return todo;
}

export async function deleteTodo(id: number) {
  await todoDao.deleteTodoById(id);
}
