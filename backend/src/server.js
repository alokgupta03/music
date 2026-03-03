import dns from "node:dns";
import express from "express";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", songRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
