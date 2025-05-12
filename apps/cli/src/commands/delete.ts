import { Command } from "commander";
import { loadTasks, saveTasks } from "../lib/storage";

export const deleteCommand = new Command("delete");

deleteCommand
  .description("delete a Task by ID")
  .argument("<taskId>", "Task Id to delete", parseInt)
  .usage("pnpm cli delete <taskId>")
  .action(deleteTask);

function deleteTask(taskId: number) {
  const tasks = loadTasks();
  const idx = tasks.findIndex((t) => t.id == taskId);

  if (idx !== -1) {
    tasks.splice(idx, 1);
    console.log(`Task with ID ${taskId} has been deleted.`);
    saveTasks(tasks)
  } else {
    console.error(`Task with ID ${taskId} not found.`);
  }
}
