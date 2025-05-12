import { Command } from "commander";
import { DencoderOptions } from "../model/options";
import { decryptCaesar } from "../utils/caesar";
import { getFileName, readFile, writeFile } from "../utils/file";

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
    await decryptFile(f, options.shift, options.output);
  });
}

async function decryptFile(filePath: string, shift: number, outputDir: string) {
  // Implement the file encryption logic here
  console.log(`Decrypting file: ${filePath} with shift value: ${shift}`);
  const fileName = getFileName(filePath);
  const fileContent = readFile(filePath);
  const decryptedContent = decryptCaesar(fileContent, shift);
  writeFile(`${outputDir}/${fileName}`, decryptedContent);
}
