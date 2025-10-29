const axios = require("axios");

// ✅ Fetch top 10 coins from CoinGecko
exports.getCoins = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );

    res.json(response.data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching coins:", error.message);
    res.status(500).json({ message: "Failed to fetch coins" });
  }
};

// ✅ Fetch 7-day price history for a specific coin (optional)
exports.getHistoryByCoin = async (req, res) => {
  try {
    const { coinId } = req.params;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: 7,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching coin history:", error.message);
    res.status(500).json({ message: "Failed to fetch coin history" });
  }
};
