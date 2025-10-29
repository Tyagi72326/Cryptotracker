// backend/scheduler.js
const cron = require("node-cron");
const axios = require("axios");
const Coin = require("./models/coin"); // current data model
const History = require("./models/history"); // history data model

// Schedule cron job — every 1 minute for testing
cron.schedule("* * * * *", async () => {
  try {
    console.log("Cron Job Running at:", new Date().toLocaleString());

    // Fetch data from CoinGecko
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );

    // Save current data (overwrite)
    await Coin.deleteMany({});
    await Coin.insertMany(data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    })));

    // Save snapshot to history collection
    await History.insertMany(data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    })));

    console.log("✅ Cron Job: Data fetched and stored successfully at", new Date().toLocaleString());
  } catch (error) {
    console.error("❌ Cron Job Error:", error.message);
  }
});
