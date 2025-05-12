import { Command } from "commander";
import { deleteTaskById, loadTaskById } from "../lib/db";

export const deleteCommand = new Command("delete");

deleteCommand
  .description("delete a Task by ID")
  .argument("<taskId>", "Task Id to delete", parseInt)
  .usage("pnpm cli delete <taskId>")
  .action(deleteTask);

async function deleteTask(taskId: number) {
  const taskToDelete = await loadTaskById(taskId);
  if (!taskToDelete) {
    console.log("❗ Task not found.");
    return;
  }
  deleteTaskById(taskId);
  console.log(`🗑️ Task "${taskToDelete.description}" deleted.`);
}
