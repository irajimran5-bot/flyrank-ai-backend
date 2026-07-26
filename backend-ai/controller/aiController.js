import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Expense from "../models/Expense.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeTextWithAI = async (req, res, next) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({ success: false, message: "promptText is required" });
    }

    let aiResult;
    let source = "gemini-api";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are a precise backend AI assistant. Always return your response in a valid JSON object format with keys: 'summary', 'category', and 'confidenceScore'.",
        },
      });
      aiResult = JSON.parse(response.text);
    } catch (apiError) {
      source = "offline-fallback";
      aiResult = {
        summary: `Processed locally: "${promptText.substring(0, 40)}..."`,
        category: promptText.toLowerCase().includes("food") ? "Food & Groceries" : "General Expense",
        confidenceScore: 0.50
      };
    }

    try {
      await Expense.create({
        summary: aiResult.summary,
        category: aiResult.category,
        confidenceScore: aiResult.confidenceScore,
        originalText: promptText
      });
    } catch (dbError) {
      console.warn("Database save failed, but proceeding with response:", dbError.message);
    }

    return res.status(200).json({
      success: true,
      source,
      data: aiResult
    });

  } catch (error) {
    console.error("Critical Server Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};