import { decryptCommand } from "./command/decrypt";
import { encryptCommand } from "./command/encrypt";
import { Command } from "commander";

const program = new Command();

program
  .name("file-crypto")
  .description("Encrypt and decrypt large files using Caesar cipher")
  .version("1.0.0");

program.addCommand(encryptCommand);
program.addCommand(decryptCommand);

program.parse(process.argv);