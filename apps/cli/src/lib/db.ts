import { Priority, Task } from "@task-tracker/types";
import { PrismaClient } from "../generated/prisma";
import { Task as PrismaTask } from "../generated/prisma";
import { parsePriority, parseStatus } from "../utils/taskUtils";

const prisma = new PrismaClient();

export async function loadTasks(status?: string): Promise<Task[]> {
  const statusFilter = parseStatus(status);
  let result;
  result = await prisma.task.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
  });
  return result?.map(convertTask);
}

export async function createTask(task: Task): Promise<Task> {
  const t = await prisma.task.create({
    data: {
      title: task.description,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      priority: parsePriority(task.priority),
    },
  });
  console.log("Task created:", t.id);
  return convertTask(t);
}

export async function loadTaskById(id: number): Promise<Task | undefined> {
  if (!id) {
    throw new Error("Task ID is required to load a task.");
  }
  const result = await prisma.task.findUnique({
    where: { id: id },
  });
  return result ? convertTask(result) : undefined;
}

export async function updateTask(task: Task): Promise<Task> {
  const t = await prisma.task.update({
    where: { id: task.id },
    data: {
      title: task.description,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      priority: parsePriority(task.priority),
    },
  });
  return convertTask(t);
}

export async function deleteTaskById(id: number): Promise<void> {
  await prisma.task.delete({
    where: { id },
  });
}

function convertTask(t: PrismaTask): Task {
  return {
    id: t.id,
    description: t.title,
    dueDate: t.dueDate?.toDateString(),
    priority: t.priority?.toLowerCase() as Priority,
    status: parseStatus(t.status)!,
  };
}
