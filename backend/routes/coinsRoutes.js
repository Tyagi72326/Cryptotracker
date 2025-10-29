const express = require("express");
const router = express.Router();
const { getCoins, getHistoryByCoin } = require("../controllers/coinsController");

// ✅ Route to get top 10 coins
router.get("/", getCoins);

// ✅ Route to get historical data by coinId (optional)
router.get("/:coinId/history", getHistoryByCoin);

module.exports = router;
