import express from "express";
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config()
connectDB()
const app = express();
app.use(express.json());

app.use('/api/users',userRoutes)
const PORT = process

app.listen(PORT,()=>{
    console.log(`SErver is running on http://localhost:${PORT}`);
})