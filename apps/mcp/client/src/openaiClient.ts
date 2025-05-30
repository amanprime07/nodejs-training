import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat";
import readline from "readline/promises";

export class OpenAiMCPClient {
  private mcp: Client;
  private openAi: OpenAI;
  private transport: StdioClientTransport | null = null;
  private tools: ChatCompletionTool[] = [];
  private model: string;

  constructor(key: string) {
    this.model = "meta-llama/llama-4-scout:free";
    // this.model = "google/gemini-2.0-flash-exp:free";
    // this.model = "meta-llama/llama-3.3-8b-instruct:free";

    this.openAi = new OpenAI({
      apiKey: key,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "HTTP-Referer": "mcp-client", "X-Title": "mcp-client" },
    });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport);

      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          type: "function",
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema,
          },
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map((t) => t.function.name)
      );
      // console.debug(JSON.stringify(this.tools, null, 2));
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  private buildPrompt(instruction: string): string {
    return `
            You are an AI assistant that responds to user query. You can use available tools if required.
            Instruction: "${instruction}"
            `;
  }

  async processQuery(query: string) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: this.buildPrompt(query),
      },
    ];

    const response = await this.openAi.chat.completions.create({
      model: this.model,
      max_tokens: 1000,
      messages,
      tools: this.tools,
      tool_choice: "auto",
      // stream: true
    });
    // console.log(JSON.stringify(response, null, 2));
    const finalText = [];
    const toolResults = [];

    for (const choice of response.choices) {
      if (!choice.message.tool_calls) {
        finalText.push(choice.message.content);
      } else if (choice.message.tool_calls) {
        for (const toolCall of choice.message.tool_calls) {
          const toolName = toolCall.function.name;
          const toolArgs = toolCall.function.arguments;
          // console.log(toolCall);
          // console.log(`[Calling tool ${toolName} with args ${toolArgs}]`);
          const parsedArgs = JSON.parse(toolArgs) as
            | { [x: string]: unknown }
            | undefined;
          const result = await this.mcp.callTool({
            name: toolName,
            arguments: parsedArgs,
          });
          toolResults.push(result);
          finalText.push(`[Calling tool ${toolName} with args ${toolArgs}]`);
          messages.push({
            role: "user",
            content: result.content as string,
          });
        }

        const response = await this.openAi.chat.completions.create({
          model: this.model,
          max_tokens: 1000,
          messages,
        });

        finalText.push(
          response.choices[0].message.content
            ? response.choices[0].message.content
            : ""
        );
      }
    }

    return finalText.join("\n");
  }

  async chatLoop() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      rl.close();
    }
  }

  async cleanup() {
    await this.mcp.close();
  }
}
