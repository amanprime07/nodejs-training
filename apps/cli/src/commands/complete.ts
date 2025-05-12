import { Task, TaskStatus } from "@task-tracker/types";
import { Command } from "commander";
import { loadTaskById, updateTask } from "../lib/db";

export const completeCommand = new Command("complete");

completeCommand
  .description("Marks a new Task as Completed")
  .usage("pnpm cli complete <task Id>")
  .argument("<taskId>", "Task ID to complete", parseInt)
  .action(async (taskId) => {
    await complete(taskId);
  });

async function complete(taskId: number) {
  const taskToComplete = await loadTaskById(taskId);
  if (!taskToComplete) {
    console.log("❗ Task not found.");
    return;
  }
  taskToComplete.status = TaskStatus.Completed;
  // Update the task in the database
  await updateTask(taskToComplete);
  console.log(
    `🎉 Task "${taskToComplete.description}" marked as ${TaskStatus.Completed}.`
  );
}
