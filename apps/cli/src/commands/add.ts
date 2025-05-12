import { Priority, Task, TaskStatus } from "@task-tracker/types";
// import { loadTasks, saveTasks } from "../lib/storage";
import { Command } from "commander";
import { createTask } from "../lib/db";

export const addCommand = new Command("add");

addCommand
  .description("Create a new Task")
  .requiredOption("-t, --title <title>", "Task Title")
  .option("-d, --dueDate <dueDate>", "Due Date (YYYY-MM-DD)")
  .option("-p, --priority <priority>", "Priority (LOW, MEDIUM, HIGH)")
  .usage("pnpm cli add <task description>")
  .action(async (options) => {
    await addTask(options.title, options.priority?.toLowerCase(), options.dueDate)
  });

async function addTask(description: string, priority?: string, dueDate?: string) {
  // const tasks = loadTasks();
  const task: Task = {
    id: Date.now(),
    description,
    status: TaskStatus.Pending,
    priority: priority as Priority,
    dueDate: dueDate
  };
  // tasks.push(task);
  createTask(task);
  console.log("✅ Task added:", task.description);
}