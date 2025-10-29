import React from "react";
import { Link } from "react-router-dom";
import "./CoinCard.css";

const CoinCard = ({ coin }) => {
  return (
    <div className="coin-card">
      <img src={coin.image} alt={coin.name} />
      <h3>{coin.name}</h3>
      <p>Symbol: {coin.symbol.toUpperCase()}</p>
      <p>Price: ${coin.current_price.toLocaleString()}</p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
      <p
        style={{
          color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
        }}
      >
        24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p>Last Updated: {new Date(coin.last_updated).toLocaleString()}</p>
      <Link to={`/history/${coin.id}`} className="history-btn">
        View History
      </Link>
    </div>
  );
};

export default CoinCard;
