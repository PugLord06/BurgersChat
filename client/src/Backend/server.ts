import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {
  Content,
  createUserContent,
  GenerateContentResponse,
  GoogleGenAI,
  PartListUnion,
} from "@google/genai";
import { Part } from "@google/generative-ai";
import { text } from "stream/consumers";

dotenv.config();

const app = express();
const port = 5000;
const apiKey = process.env.GEMINI_API_KEY;
const burgersAI = new GoogleGenAI({ apiKey });

if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

let chatHistory: Content[] = [];

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const userMessage: string = req.body.message;

    if (!userMessage) throw new Error("No message provided");

    chatHistory.push({
      parts: [{ text: userMessage }],
      role: "user",
    });

    const chat = burgersAI.chats.create({
      model: "gemini-2.0-flash",
      history: chatHistory,
    });

    const response = await chat.sendMessage({
      message: userMessage,
    });
    console.log("API Response:", response.text);

    if (!response.text) {
      throw new Error("API request failed: No response text returned");
    }

    chatHistory.push({
      parts: [{ text: response.text }],
      role: "model",
    });

    res.json({ message: response.text });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error you fucked up dumbass" });
  }
});

app.post("/api/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = "example-token";
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
