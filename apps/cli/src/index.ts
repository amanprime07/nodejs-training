#!/usr/bin/env node
import { Command } from "commander";
import { addCommand } from "./commands/add";
import { listCommand } from "./commands/list";
import { completeCommand } from "./commands/complete";

const program = new Command("cli");

program.addCommand(addCommand).addCommand(listCommand).addCommand(completeCommand)

program.parse();
