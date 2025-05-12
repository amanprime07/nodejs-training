import { FileHandle, open } from "fs/promises";

export async function openFile(
  path: string,
  mode: string = "r"
): Promise<FileHandle> {
  return open(path, mode);
}

// export async function createNewFile(filePath: string): FileHandle {
//     // cr
    
// }

export async function writeToFile(file: FileHandle, content: string) {
  await file.writeFile(content, "utf-8");
}

export async function closeFile(file: FileHandle) {
  await file.close();
}
