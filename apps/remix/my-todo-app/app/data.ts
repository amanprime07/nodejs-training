import {
  deleteTodoById,
  getAllTodos,
  getTodoById,
  insertTodo,
  updateTodoById,
} from "../dao/todo.dao";
import { NewTodo, UpdateTodo } from "../drizzle/schema";

export async function getTodos(query?: string | null, status?: string | null) {
  const todos = await getAllTodos(status === "complete");
  return todos;
}

export async function createTodo(todo: NewTodo) {
    return await insertTodo(todo)
}

export async function getTodo(id: number) {
  return await getTodoById(id);
}

export async function updateTodo(id: number, updates: UpdateTodo) {
  const todo = await getTodoById(id);
  if (!todo) {
    throw new Error(`No todo found for ${id}`);
  }
  await updateTodoById(id, { ...todo, ...updates });
  return todo;
}

export async function deleteTodo(id: number) {
  await deleteTodoById(id);
}
