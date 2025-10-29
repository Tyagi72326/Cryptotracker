// ------------------------------
// 🌐 IMPORTS & INITIAL SETUP
// ------------------------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ------------------------------
// 🛠️ IMPORT ROUTES
// ------------------------------
const authRoutes = require("./routes/authRoutes");
const coinRoutes = require("./routes/coinsRoutes");
const historyRoutes = require("./routes/historyRoutes");

// ------------------------------
// 🔗 USE ROUTES
// ------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/coins", coinRoutes);
app.use("/api/history", historyRoutes);

// ------------------------------
// ⚙️ DATABASE CONNECTION
// ------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ------------------------------
// 🕒 CRON JOB (auto import)
// ------------------------------
require("./scheduler"); // runs every hour (or every minute for testing)

// ------------------------------
// 🚀 START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// ------------------------------
// 🧩 BASE ROUTE
// ------------------------------
app.get("/", (req, res) => {
  res.send("✅ Crypto Tracker Backend Running Successfully!");
});
