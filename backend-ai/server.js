import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
const app=express();
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(express.json());
app.use("/api/ai",aiRoutes);
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Backend AI service is running!"});
})
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port:${PORT}`);
});