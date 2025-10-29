const axios = require("axios");
const Coin = require("../models/coin");
const History = require("../models/history");

exports.storeSnapshot = async (req, res) => {
  try {
    // Fetch top 10 coins
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );

    // Overwrite "Current" data
    await Coin.deleteMany({});
    await Coin.insertMany(
      data.map((c) => ({
        coinId: c.id,
        name: c.name,
        symbol: c.symbol,
        price: c.current_price,
        marketCap: c.market_cap,
        change24h: c.price_change_percentage_24h,
      }))
    );

    // Append to "History"
    await History.insertMany(
      data.map((c) => ({
        coinId: c.id,
        name: c.name,
        symbol: c.symbol,
        price: c.current_price,
        marketCap: c.market_cap,
        change24h: c.price_change_percentage_24h,
      }))
    );

    res.json({ message: "Snapshot saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save snapshot" });
  }
};
