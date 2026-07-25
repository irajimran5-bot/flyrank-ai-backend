import express from "express";
import { analyzeTextWithAI } from "../controller/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeTextWithAI);

export default router;