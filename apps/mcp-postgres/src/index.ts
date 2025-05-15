import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/users";
import openAiRouter from "./routes/openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "MCP server is running" });
});

app.listen(port, () => {
  console.log(`MCP server listening on port ${port}`);
});

app.use(userRoutes);
app.use(openAiRouter);
