import { Task } from "@task-tracker/types";
import path from "path";
import fs from "fs";

const DATA_FILE = path.join(__dirname, "../..", "tasks.json");

export function loadTasks(): Task[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (err) {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks), 'utf-8');
}
