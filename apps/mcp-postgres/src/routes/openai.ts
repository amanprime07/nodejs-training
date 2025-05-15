// apps/server/src/routes/openai.ts
import { Router, Request, Response } from "express";
import openai from "../openai";

const openAiRouter = Router();

openAiRouter.post("/query-ai", async (req: Request, res: Response) => {
  test(req, res);
});

async function test(req: Request, res: Response) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }
  try {
    const result = await queryOpenAi(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json("Error querying AI.");
  }
}

function buildPrompt(instruction: string): string {
  return `
You are an AI that converts instructions to SQL for a PostgreSQL database.
Return only the SQL query. No explanations, no formatting.

Instruction: "${instruction}"
SQL:
`;
}

async function queryOpenAi(prompt: string): Promise<string> {
  const fullPrompt = buildPrompt(prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [{ role: "user", content: fullPrompt }],
      max_tokens: 200,
      temperature: 0,
    });

    const result = response.choices[0]?.message?.content!.trim();
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error querying OpenAI");
  }
}
export default openAiRouter;
