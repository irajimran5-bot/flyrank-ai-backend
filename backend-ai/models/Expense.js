import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  category: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  originalText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Expense", expenseSchema);