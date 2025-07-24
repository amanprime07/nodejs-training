import invariant from "tiny-invariant";
import { db } from "../drizzle/db";
import { NewTodo, Todo, todos, UpdateTodo } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export class TodoDao {
  constructor(private dbInstance = db) {}

  async getAllTodos(completed: boolean = false): Promise<Todo[]> {
    return await this.dbInstance
      .select()
      .from(todos)
      .where(eq(todos.completed, completed))
      .orderBy(desc(todos.createdAt));
  }

  async getTodoById(id: number) {
    invariant(id, "Id cannot be null");
    const todo = await this.dbInstance.query.todos.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return todo;
  }

  async insertTodo(todo: NewTodo) {
    const insert = await this.dbInstance.insert(todos).values(todo).returning();
    return insert[0];
  }

  async updateTodoById(id: number, updates: UpdateTodo) {
    await this.dbInstance.update(todos).set(updates).where(eq(todos.id, id));
  }

  async deleteTodoById(id: number) {
    await this.dbInstance.delete(todos).where(eq(todos.id, id));
  }
}
