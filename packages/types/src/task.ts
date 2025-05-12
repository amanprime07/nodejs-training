export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  dueDate?: string; // optional
  priority?: Priority; // optional
}

export enum TaskStatus {
  Pending = "pending",
  Completed = "completed",
}

export type Priority = "low" | "medium" | "high";
