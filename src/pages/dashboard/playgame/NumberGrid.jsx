// NumberGrid.jsx - Kuch change nahi
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlayGame.css";

const NumberGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gameName } = location.state || { gameName: "DISAWER" };
  
  const numbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, "0")),
    "00",
  ];

  const [betAmounts, setBetAmounts] = useState({});
  const [balance, setBalance] = useState(10000);

  const handleAmountChange = (number, value) => {
    setBetAmounts((prev) => ({
      ...prev,
      [number]: value,
    }));
  };

  const handleReset = () => {
    setBetAmounts({});
  };

  const totalAmount = Object.values(betAmounts).reduce(
    (sum, amount) => sum + (Number(amount) || 0),
    0
  );

  const handlePlay = () => {
    const selectedBets = Object.entries(betAmounts).filter(
      ([, amount]) => Number(amount) > 0
    );

    if (selectedBets.length === 0) {
      alert("Please enter at least one amount");
      return;
    }

    if (totalAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    console.log(selectedBets);
    alert(`Total Bet Amount ₹${totalAmount}`);
    setBalance(balance - totalAmount);
    setBetAmounts({});
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="number-grid-wrapper">
      {/* Header */}
      <div className="game-header">
        <div className="header-left">
          <FaArrowLeft className="back-icon" onClick={goBack} />
          <div>
            <h3>{gameName}</h3>
            <p>Balance : ₹ {balance.toFixed(2)}</p>
          </div>
        </div>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Bet History
        </button>
      </div>

      {/* Grid */}
      <div className="number-grid">
        {numbers.map((num) => (
          <div key={num} className="number-card">
            <div className="number-title">{num}</div>
            <input
              type="number"
              className="number-input"
              value={betAmounts[num] || ""}
              onChange={(e) => handleAmountChange(num, e.target.value)}
              min="1"
              placeholder="0"
            />
          </div>
        ))}
      </div>

      {/* Bottom Bar - Fixed position */}
      <div className="bottom-bar">
        <div className="total-box">
          Total: ₹ {totalAmount}/-
        </div>
        <button className="play-button" onClick={handlePlay}>
          Play
        </button>
      </div>
    </div>
  );
};

export default NumberGrid;