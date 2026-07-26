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

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are a precise backend AI assistant. Always return your response in a valid JSON object format with keys: 'summary', 'category', and 'confidenceScore'.",
        },
      });

      const aiResult = JSON.parse(response.text);
      return res.status(200).json({
        success: true,
        source: "gemini-api",
        data: aiResult,
      });

    } catch (apiError) {
      console.warn("Gemini API connection failed, switching to fallback heuristic engine:", apiError.message);

     
      const fallbackResult = {
        summary: `Processed locally: "${promptText.substring(0, 40)}..."`,
        category: promptText.toLowerCase().includes("food") || promptText.toLowerCase().includes("groceries") ? "Food & Groceries" : "General Expense",
        confidenceScore: 0.50, 
        note: "Generated via offline fallback due to network restriction."
      };

      return res.status(200).json({
        success: true,
        source: "offline-fallback",
        data: fallbackResult,
      });
    }

  } catch (error) {
    console.error("Critical Server Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};