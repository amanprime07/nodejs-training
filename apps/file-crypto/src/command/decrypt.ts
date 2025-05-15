import { Command } from "commander";
import { createPipeline, readStream, writeStream } from "../utils/streamFile";
import { DencoderOptions } from "../model/options";
import { closeFile, openFile, writeToFile } from "../utils/asyncFile";
import { decryptCaesar, decryptTransform } from "../utils/caesar";
import { getFileName, readFile, writeFile } from "../utils/syncFile";

export const decryptCommand = new Command("decrypt")
  .description("Decrypt a file")
  .requiredOption("-o, --output <output>", "Output directory")
  // .option('-d --directory <directory>', 'Directory to read while decrypting file')
  .option("-f --files <files...>", "Files to decrypt")
  .requiredOption("-s, --shift <shift>", "Shift Value to decrypt the file")
  .action(async (options) => {
    await decrypt(options);
  });

async function decrypt(options: DencoderOptions) {
  // Implement the decryption logic here
  console.log("Decrypting file with options:", options);
  if (!options.directory && (!options.files || options.files.length === 0)) {
    console.log(`Either file or directory must be provided`);
    return;
  }
  options.files?.forEach(async (f) => {
    await decryptFileStream(f, options.shift, options.output);
  });
}

async function decryptFileSync(
  filePath: string,
  shift: number,
  outputDir: string
) {
  // Implement the file encryption logic here
  console.log(`Decrypting file: ${filePath} with shift value: ${shift}`);
  const fileName = getFileName(filePath);
  const fileContent = readFile(filePath);
  const decryptedContent = decryptCaesar(fileContent, shift);
  writeFile(`${outputDir}/${fileName}`, decryptedContent);
}

async function decryptFileAsync(
  filePath: string,
  shift: number,
  outputDir: string
) {
  const fileToRead = await openFile(filePath);
  const fileName = getFileName(filePath);
  const fileToWrite = await openFile(`${outputDir}/${fileName}`, "a");
  try {
    for await (const line of fileToRead.readLines()) {
      const decryptedContent = decryptCaesar(line, shift);
      await writeToFile(fileToWrite, decryptedContent);
    }
  } catch (error) {
    console.log(error);
  } finally {
    closeFile(fileToRead);
    closeFile(fileToWrite);
  }
}

async function decryptFileStream(
  filePath: string,
  shift: number,
  outputDir: string
) {
  const fileToRead = readStream(filePath);
  const fileName = getFileName(filePath);
  const fileToWrite = writeStream(`${outputDir}/${fileName}`);
  const transform = decryptTransform(shift);
  try {
    await createPipeline(fileToRead, transform, fileToWrite);
  } catch (error) {
    console.log(error);
  }
  console.log(`"Decrypted": ${filePath} → ${outputDir}/${fileName}`);
}