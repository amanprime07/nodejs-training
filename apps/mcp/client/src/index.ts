import dotenv from "dotenv";
import { OpenAiMCPClient } from "./openaiClient";

dotenv.config();

async function main() {
  const model = process.env.MODEL || "";
  console.log(`Using ${model} model for MCP Client`);
  let KEY;
  if (model.toLowerCase() === "openai") {
    KEY = process.env.OPEN_ROUTER_API_KEY;
  } else if (model.toLowerCase() === "anthropic") {
    KEY = process.env.ANTHROPIC_API_KEY;
  }

  if (!KEY) {
    throw new Error("ANTHROPIC_API_KEY or OPEN_ROUTER_API_KEY is not set");
  }
  if (process.argv.length < 3) {
    console.log("Usage: node index.ts <path_to_server_script>");
    return;
  }
  const mcpClient = new OpenAiMCPClient(KEY);
  try {
    await mcpClient.connectToServer(process.argv[2]);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();
