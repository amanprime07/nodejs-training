import {
  createReadStream,
  createWriteStream,
  ReadStream,
  WriteStream,
} from "fs";
import { Transform } from "stream";
import { pipeline } from "stream/promises";

export function readStream(
  filePath: string,
  encoding: BufferEncoding = "utf-8"
): ReadStream {
  return createReadStream(filePath, { encoding });
}

export function writeStream(
  filePath: string,
  encoding: BufferEncoding = "utf-8"
): WriteStream {
  return createWriteStream(filePath, { encoding });
}

export async function createPipeline(readStream: ReadStream, transform: Transform, writeStream: WriteStream) {
  await pipeline(readStream, transform, writeStream);
}
