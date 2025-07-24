import { describe, it, expect, beforeEach, vi } from "vitest";
import * as data from "../app/data";
import { TodoDao } from "../dao/todo.dao";
import { NewTodo } from "../drizzle/schema";

// Mock TodoDao methods
vi.mock("../dao/todo.dao", () => {
  return {
    TodoDao: vi.fn().mockImplementation(() => ({
      getAllTodos: vi.fn(async () => [
        {
          id: 1,
          title: "Test",
          completed: false,
          description: null,
          priority: null,
          createdAt: new Date(),
        },
      ]),
      getTodoById: vi.fn(async (id) =>
        id === 1
          ? {
              id: 1,
              title: "Test",
              completed: false,
              description: null,
              priority: null,
              createdAt: new Date(),
            }
          : null
      ),
      insertTodo: vi.fn(async (todo) => ({ ...todo, id: 2 })),
      updateTodoById: vi.fn(async () => {}),
      deleteTodoById: vi.fn(async () => {}),
    })),
  };
});

describe("data.ts", () => {
  it("getTodos returns todos", async () => {
    const todos = await data.getTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe("Test");
  });

  it("createTodo returns new todo with id", async () => {
    const newTodo: NewTodo = {
      title: "New",
      completed: false,
      description: null,
      priority: null,
      createdAt: new Date(),
    };
    const todo = await data.createTodo(newTodo);
    expect(todo.id).toBe(2);
    expect(todo.title).toBe("New");
  });

  it("getTodo returns todo by id", async () => {
    const todo = await data.getTodo(1);
    expect(todo).not.toBeNull();
    expect(todo?.id).toBe(1);
  });

  it("updateTodo updates todo", async () => {
    await expect(
      data.updateTodo(1, { completed: true })
    ).resolves.not.toThrow();
  });

  it("deleteTodo deletes todo", async () => {
    await expect(data.deleteTodo(1)).resolves.not.toThrow();
  });
});
