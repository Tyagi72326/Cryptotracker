import React from "react";
import "./SearchSort.css";

const SearchSort = ({ search, setSearch, sortBy, setSortBy }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="search-sort">
      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {/* 🔽 Sort dropdown */}
      <select value={sortBy} onChange={handleSort} className="sort-select">
        <option value="market_cap_desc">Market Cap ↓</option>
        <option value="market_cap_asc">Market Cap ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="price_asc">Price ↑</option>
      </select>
    </div>
  );
};

export default SearchSort;
