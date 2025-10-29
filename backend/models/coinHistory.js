const mongoose = require('mongoose');

const CoinHistorySchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CoinHistory', CoinHistorySchema);
