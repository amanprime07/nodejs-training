import { Command } from "commander";
import { DencoderOptions } from "../model/options";
import { encryptCaesar } from "../utils/caesar";
import { getFileName, readFile, writeFile } from "../utils/file";

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
    await encryptFile(f, options.shift, options.output);
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