import { describe, it, expect, beforeEach, vi } from "vitest";
import { TodoDao } from "../dao/todo.dao";
import { NewTodo, Todo } from "../drizzle/schema";

// Mock db and drizzle-orm methods
const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Test",
      completed: false,
      description: null,
      priority: null,
      createdAt: new Date(),
    },
  ]),
  query: {
    todos: {
      findFirst: vi.fn(async ({ where }: any) => {
        // Always return a valid todo for testing
        return {
          id: 1,
          title: "Test",
          completed: false,
          description: null,
          priority: null,
          createdAt: new Date(),
        };
      }),
    },
  },
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn().mockResolvedValue([
    {
      id: 2,
      title: "New",
      completed: false,
      description: null,
      priority: null,
      createdAt: new Date(),
    },
  ]),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
};

describe("TodoDao", () => {
  let dao: TodoDao;

  beforeEach(() => {
    dao = new TodoDao(mockDb as any);
    vi.clearAllMocks();
  });

  it("getAllTodos returns todos", async () => {
    const todos = await dao.getAllTodos(false);
    expect(Array.isArray(todos)).toBe(true);
    expect(todos[0].title).toBe("Test");
    expect(mockDb.orderBy).toHaveBeenCalled();
  });

  it("getTodoById returns todo", async () => {
    const todo = await dao.getTodoById(1);
    expect(todo).not.toBeNull();
    expect(todo.title).toBe("Test");
    expect(mockDb.query.todos.findFirst).toHaveBeenCalled();
  });

  it("insertTodo returns inserted todo", async () => {
    const newTodo: NewTodo = {
      title: "New",
      completed: false,
      description: null,
      priority: null,
      createdAt: new Date(),
    };
    const todo = await dao.insertTodo(newTodo);
    expect(todo.id).toBe(2);
    expect(todo.title).toBe("New");
    expect(mockDb.returning).toHaveBeenCalled();
  });

  it("updateTodoById calls update", async () => {
    await dao.updateTodoById(1, { completed: true });
    expect(mockDb.update).toHaveBeenCalled();
    expect(mockDb.set).toHaveBeenCalled();
  });

  it("deleteTodoById calls delete", async () => {
    await dao.deleteTodoById(1);
    expect(mockDb.delete).toHaveBeenCalled();
  });
});
