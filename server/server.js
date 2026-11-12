import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
}));
app.use(express.json());
app.get("/", (req, res) => res.status(200).send("Event Management API Running"));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => app.listen(port, () => console.log(`API listening on ${port}`)))
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`);
      process.exitCode = 1;
    });
}
export default app;
