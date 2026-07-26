import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend AI Service is running!" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/backend-ai")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });