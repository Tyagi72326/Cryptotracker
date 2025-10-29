import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";
import SearchSort from "../components/SearchSort";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  // ✅ Fetch live data (auto-refresh every 30 minutes)
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/coins")
        .then((res) => res.json())
        .then((data) => {
          setCoins(data);
          setFiltered(data);
        })
        .catch((err) => console.error("Error fetching coins:", err));
    };

    fetchData(); // Initial fetch when page loads

    // 🔁 Auto refresh every 30 minutes (30 * 60 * 1000 ms)
    const interval = setInterval(fetchData, 30 * 60 * 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // ✅ Search and sort
  useEffect(() => {
    let temp = [...coins];

    if (search.trim() !== "") {
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "price_asc") temp.sort((a, b) => a.current_price - b.current_price);
    if (sortBy === "price_desc") temp.sort((a, b) => b.current_price - a.current_price);
    if (sortBy === "market_cap_desc") temp.sort((a, b) => b.market_cap - a.market_cap);
    if (sortBy === "market_cap_asc") temp.sort((a, b) => a.market_cap - b.market_cap);

    setFiltered(temp);
  }, [search, sortBy, coins]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Top 10 Cryptocurrencies</h1>

        <SearchSort
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid">
          {filtered.length > 0 ? (
            filtered.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>Loading coins...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
