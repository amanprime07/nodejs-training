import { readFileSync, writeFileSync } from "fs";

export function getFileName(filePath: string): string {
  const parts = filePath.split("/");
  return parts[parts.length - 1];
}

export function readFile(path: string): string {
  return readFileSync(path, "utf-8");
}

export function writeFile(path: string, content: string) {
  writeFileSync(path, content, "utf-8");
}
