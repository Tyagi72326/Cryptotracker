const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const axios = require("axios");

dotenv.config();

// ✅ Initialize express first (this must come before app.use)
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const coinsRoutes = require("./routes/coinsRoutes");
const historyRoutes = require("./routes/historyRoutes");

// ✅ Use routes after app is initialized
app.use("/api/auth", authRoutes);
app.use("/api/coins", coinsRoutes);
app.use("/api/history", historyRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ✅ Cron job: Run every hour to store snapshot
cron.schedule("0 * * * *", async () => {
  console.log("⏱ Running hourly snapshot job...");
  try {
    await axios.post("http://localhost:5000/api/history");
    console.log("✅ Snapshot saved successfully.");
  } catch (err) {
    console.error("❌ Snapshot job failed:", err.message);
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
