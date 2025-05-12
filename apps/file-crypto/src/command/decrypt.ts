import { Command } from "commander"
import { DencoderOptions } from "model/options"

export const decryptCommand = new Command('decrypt')
  .description('Decrypt a file')
  .requiredOption('-o, --output <output>', 'Output directory')
  .option('-d --directory <directory>', 'Directory to read while decrypting file')
  .option('-f --file <file>', 'File to decrypt')
  .requiredOption('-k --shiftValue <key>', 'Shift Value to decrypt the file')
  .action(async (options) => { await decryptFile(options) })

async function decryptFile(options: DencoderOptions) {
  // Implement the decryption logic here
  console.log('Decrypting file with options:', options)

}
