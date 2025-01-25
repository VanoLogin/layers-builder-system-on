import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import diagramRoutes from "./routes/diagramRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Подключаемся к MongoDB
connectDB();

// Роуты
app.use("/api/diagrams", diagramRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
