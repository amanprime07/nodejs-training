import invariant from "tiny-invariant";
import { db } from "../drizzle/db";
import { NewTodo, Todo, todos, UpdateTodo } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllTodos(completed: boolean = false): Promise<Todo[]> {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.completed, completed))
    .orderBy(desc(todos.createdAt));
}

export async function getTodoById(id: number) {
  invariant(id, "Id cannot be null");
  const todo = await db.query.todos.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
  return todo;
}

export async function insertTodo(todo: NewTodo) {
  const insert =  await db.insert(todos).values(todo).returning();
  return insert[0];
}

export async function updateTodoById(id:number, updates: UpdateTodo) {
  await db.update(todos).set(updates).where(eq(todos.id, id));
}

export async function deleteTodoById(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
}
