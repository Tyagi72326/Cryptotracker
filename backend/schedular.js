require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');
const connectDB = require('./db/connect');
const CoinHistory = require('./models/coinHistory');

const coingeckoUrl = process.env.COINGECKO_URL || 'https://api.coingecko.com/api/v3/coins/markets';
const buildParams = () => ({
  vs_currency: process.env.VS_CURRENCY || 'usd',
  order: 'market_cap_desc',
  per_page: process.env.PER_PAGE || 10,
  page: process.env.PAGE || 1,
  price_change_percentage: '24h'
});

const runJob = async () => {
  try {
    const params = buildParams();
    const res = await axios.get(coingeckoUrl, { params });
    const docs = res.data.map(c => ({
      coinId: c.id,
      name: c.name,
      symbol: c.symbol,
      price: c.current_price,
      marketCap: c.market_cap,
      change24h: c.price_change_percentage_24h,
      fetchedAt: c.last_updated ? new Date(c.last_updated) : new Date()
    }));
    await CoinHistory.insertMany(docs);
    console.log('Cron: saved history snapshot', new Date().toISOString());
  } catch (err) {
    console.error('Cron error', err);
  }
};

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  // run immediately once:
  await runJob();
  // schedule every 1 hour: at minute 0 of every hour
  cron.schedule('0 * * * *', () => {
    runJob();
  });
  console.log('Scheduler running: will fetch every hour.');
};

start();
