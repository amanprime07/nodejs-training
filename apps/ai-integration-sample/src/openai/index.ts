import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: { "HTTP-Referer": "ai-integration", "X-Title": "ai-integration" },
});

console.log("OpenRouter.AI client initialized successfully!");

export default openai;
