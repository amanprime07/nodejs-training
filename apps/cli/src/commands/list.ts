import { TaskStatus } from "@task-tracker/types";
import { Command } from "commander";
import { loadTasks } from "../lib/db";
import { parseStatus } from "../utils/taskUtils";

interface ListOptions {
  status?: "pending" | "completed";
}

export const listCommand = new Command("list");

listCommand
  .description("List All tasks")
  .option(
    "-s, --status <status>",
    "Filters tasks by status (pending/completed)"
  )
  .action(async (options) => {
    await listTasks(options);
  });

async function listTasks(options: ListOptions) {
  const tasks = await loadTasks(parseStatus(options.status));

  if (!tasks || tasks.length === 0) {
    console.log("📭 No tasks found.");
    return;
  }
  tasks.forEach((task) => {
    console.log(
      `${task.status === TaskStatus.Completed ? "✔️" : "❌"} ${task.id} - ${
        task.description
      }`
    );
  });
}
