import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  priority: text("priority"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type UpdateTodo = Partial<Omit<Todo, "id">>;
export const todoSchema = createInsertSchema(todos);
export const updateTodoSchema = createUpdateSchema(todos);
