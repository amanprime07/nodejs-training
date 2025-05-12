import { Task, TaskStatus } from "@task-tracker/types";
import { loadTasks, saveTasks } from "../lib/storage";
import { Command } from "commander";

export const addCommand = new Command("add");

addCommand
  .description("Add a new Task")
  .argument("<description>", "Task Description")
  .usage("pnpm cli add <task description>")
  .action(addTask);

function addTask(description: string) {
  const tasks = loadTasks();
  const task: Task = {
    id: Date.now(),
    description,
    status: TaskStatus.Pending,
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log("✅ Task added:", task.description);
}
