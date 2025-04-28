import { TaskStatus } from "@task-tracker/types";
import { Command } from "commander";
import { loadTasks } from "../lib/storage";

interface ListOptions {
  status?: "pending" | "completed";
}


export const listCommand = new Command("list");

listCommand
  .description("List All tasks")
  .option("-s, --status <status>", "Filters tasks by status (pending/completed)")
  .action((options) => {
    listTasks(options);
  });

function listTasks(options: ListOptions) {
  const tasks = loadTasks();

  var filteredTasks = tasks;
  const status = parseStatus(options.status);
  if (status) {
    filteredTasks = filteredTasks.filter((t) => t.status === status);
  }

  if (!filteredTasks) {
    console.log("📭 No tasks found.");
    return;
  }
  filteredTasks.forEach((task) => {
    console.log(
      `${task.status === TaskStatus.Completed ? "✔️" : "❌"} ${task.id} - ${
        task.description
      }`
    );
  });
}

function parseStatus(input: string | undefined): TaskStatus | undefined {
  if (!input) {
    return undefined;
  }

  switch (input.toLowerCase()) {
    case "pending":
      return TaskStatus.Pending;
    case "completed":
      return TaskStatus.Completed;
    default:
      return undefined;
  }
}
