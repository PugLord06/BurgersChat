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
    if (!userMessage) throw new Error("No message provided");

    chatHistory.push({ role: "user", content: userMessage });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API key not set");

    // Use query parameter for API key as per curl example
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: chatHistory.map((msg) => ({
            parts: [{ text: msg.content }],
          })),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
    };

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Unexpected API response structure");
    }

    const aiMessage: string = data.candidates[0].content.parts[0].text;
    chatHistory.push({ role: "assistant", content: aiMessage });

    res.json({ message: aiMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});