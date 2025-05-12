import { Priority, TaskStatus } from "@task-tracker/types";
import { Priority as PrismaPriority } from "../generated/prisma";

export function parseStatus(input: string | undefined): TaskStatus | undefined {
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

export function parsePriority(priority?: Priority): PrismaPriority {
  // Convert the priority to lowercase to match the Prisma enum values
  switch(priority){
    case "low":
      return PrismaPriority.LOW;
    case "medium":
      return PrismaPriority.MEDIUM;
    case "high":
      return PrismaPriority.HIGH;
    default:
      return PrismaPriority.LOW;
  }
}
