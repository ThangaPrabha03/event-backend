import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import eventRegisterRoutes from "./routes/eventRegister.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  methods: "GET,POST",
  credentials: true,
}));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1); // Exit if DB fails
});

// Routes
app.use("/api/register-event", eventRegisterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

