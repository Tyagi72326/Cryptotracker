import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/Navbar";
import "./CoinHistory.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinHistory = () => {
  const { coinId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/coins/${coinId}/history`);
        const data = await res.json();
        setHistory(data.prices || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (coinId) fetchHistory();
  }, [coinId]);

  const chartData = {
    labels: history.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `${coinId.toUpperCase()} Price (USD)`,
        data: history.map(([, price]) => price),
        borderColor: "#6C5CE7",
        backgroundColor: "rgba(108, 92, 231, 0.2)",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>History for {coinId?.toUpperCase()}</h2>
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <div className="chart-container">
            <Line data={chartData} />
          </div>
        )}
        <Link to="/dashboard" className="btn">
          ← Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default CoinHistory;
