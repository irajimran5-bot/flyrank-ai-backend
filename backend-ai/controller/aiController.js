import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeTextWithAI = async (req, res, next) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({ success: false, message: "promptText is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a precise backend AI assistant. Always return your response in a valid JSON object format with keys: 'summary', 'category', and 'confidenceScore'.",
      },
    });

    const aiResult = JSON.parse(response.text);

    res.status(200).json({
      success: true,
      data: aiResult,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ success: false, message: "AI processing failed", error: error.message });
  }
};