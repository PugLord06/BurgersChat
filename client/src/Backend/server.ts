import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {
  Content,
  createUserContent,
  GenerateContentResponse,
  GoogleGenAI,
  Modality,
  PartListUnion,
} from "@google/genai";
import { Part } from "@google/generative-ai";
import { text } from "stream/consumers";
import * as fs from "node:fs";

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

    const response = await burgersAI.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: userMessage,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    console.log("API Response:", response.text);

    if (!response.text) {
      throw new Error("API request failed: No response text returned");
    }

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          res.json({ message: response.text });
        }else if(part.inlineData){
          const imageData = part.inlineData.data;
          if (imageData) {
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("../client/src/backend/images/gemini-test-image.png", buffer);
          } else {
            throw new Error("Image data is undefined");
          }
        }
      }
    }

    if (response.text) {
      chatHistory.push({
        parts: [{ text: response.text }],
        role: "model",
      });
    } else {
      throw new Error("API request failed: No response text returned");
    }
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
