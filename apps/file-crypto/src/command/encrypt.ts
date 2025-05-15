import { Command } from "commander";
import { DencoderOptions } from "../model/options";
import { encryptCaesar, encryptTransform } from "../utils/caesar";
import { getFileName, readFile, writeFile } from "../utils/syncFile";
import { closeFile, openFile, writeToFile } from "../utils/asyncFile";
import { createPipeline, readStream, writeStream } from "../utils/streamFile";

export const encryptCommand = new Command("encrypt")
  .description("Encrypt a file")
  .requiredOption("-o, --output <output>", "Output directory")
  .option("-f, --files <files...>", "File to decrypt")
  // .option('-d --directory <directory>', 'Directory to read while decrypting file')
  .requiredOption(
    "-s, --shift <shift>",
    "Shift Value to decrypt the file",
    parseInt
  )
  .action(async (options) => {
    await encrypt(options);
  });

async function encrypt(options: DencoderOptions) {
  // Implement the encryption logic here
  console.log("Encrypting file with options:", options);
  if (!options.directory && (!options.files || options.files.length === 0)) {
    console.log(`Either file or directory must be provided`);
    return;
  }
  options.files?.forEach(async (f) => {
    console.log(`Encrypting file: ${f} with shift value: ${options.shift}`);
    await encryptFileStream(f, options.shift, options.output);
  });
}

async function encryptFile(filePath: string, shift: number, outputDir: string) {
  // Implement the file encryption logic here
  console.log(`Encrypting file: ${filePath} with shift value: ${shift}`);
  const fileName = getFileName(filePath);
  const fileContent = readFile(filePath);
  const encryptedContent = encryptCaesar(fileContent, shift);
  writeFile(`${outputDir}/${fileName}`, encryptedContent);
}

async function encryptFileAsync(
  filePath: string,
  shift: number,
  outputDir: string
) {
  const fileToRead = await openFile(filePath);
  const fileName = getFileName(filePath);
  const fileToWrite = await openFile(`${outputDir}/${fileName}`, "a");
  try {
    for await (const line of fileToRead.readLines()) {
      const decryptedContent = encryptCaesar(line, shift);
      await writeToFile(fileToWrite, decryptedContent);
    }
  } catch (error) {
    console.log(error);
  } finally {
    closeFile(fileToRead);
    closeFile(fileToWrite);
  }
}

async function encryptFileStream(
  filePath: string,
  shift: number,
  outputDir: string
) {
  const fileToRead = readStream(filePath);
  const fileName = getFileName(filePath);
  const fileToWrite = writeStream(`${outputDir}/${fileName}`);
  const transform = encryptTransform(shift);
  try {
    await createPipeline(fileToRead, transform, fileToWrite);
  } catch (error) {
    console.log(error);
  }
  console.log(`"Encrypted": ${filePath} → ${outputDir}/${fileName}`);
}
