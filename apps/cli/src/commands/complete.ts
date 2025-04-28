import { TaskStatus } from "@task-tracker/types";
import { Command } from "commander";
import { loadTasks, saveTasks } from "../lib/storage";

export const completeCommand = new Command("complete");

completeCommand
  .description("Marks a new Task as Completed")
  .usage("pnpm cli complete <task Id>")
  .argument("<taskId>", "Task ID to complete", parseInt)
  .action(complete);

function complete(taskId: number) {
  const tasks = loadTasks();

  const taskToComplete = tasks.find((t) => t.id === taskId);
  if (!taskToComplete) {
    console.log("❗ Task not found.");
    return;
  }
  taskToComplete.status = TaskStatus.Completed;
  saveTasks(tasks);
  console.log(
    `🎉 Task "${taskToComplete.description}" marked as ${TaskStatus.Completed}.`
  );
}
