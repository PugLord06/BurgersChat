import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

interface Message {
  role: "user" | "assistant";
  content: string;
}

let chatHistory: Message[] = [];

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const userMessage: string = req.body.message;
    chatHistory.push({ role: "user", content: userMessage });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API key not set");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: chatHistory.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.content }],
          })),
        }),
      }
    );

    if (!response.ok) throw new Error("API request failed");
    const data = (await response.json()) as {
      candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
    };
    const aiMessage: string = data.candidates[0].content.parts[0].text;
    chatHistory.push({ role: "assistant", content: aiMessage });

    res.json({ message: aiMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
