import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js"
import { connectDB } from "./config/db.js"
dotenv.config()
const app = express();
const port = process.env.PORT || 3001
app.use(cors(
    {
       origin: 'http://localhost:5173'
    }
))
app.use(express.json())
app.use("/songs", songRoutes)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/songs`)
    })
})
