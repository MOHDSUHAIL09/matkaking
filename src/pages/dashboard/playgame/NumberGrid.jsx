import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlayGame.css"; // Iska CSS niche diya hai

const NumberGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gameName } = location.state || { gameName: "MUMBAI" };
  
  const numbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, "0")),
    "00",
  ];

  const [betAmounts, setBetAmounts] = useState({});
  
  // Balance ko LocalStorage se load karna
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("userBalance");
    return savedBalance ? parseFloat(savedBalance) : 10000;
  });

  const handleAmountChange = (number, value) => {
    if (value < 0) return;
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
    // 1. Filter out only those numbers where amount is entered
    const selectedBets = Object.entries(betAmounts)
      .filter(([_, amount]) => Number(amount) > 0)
      .map(([num, amt]) => ({ number: num, amount: Number(amt) }));

    if (selectedBets.length === 0) {
      alert("Bhai, pehle kisi number par amount daalo!");
      return;
    }

    if (totalAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    // --- LOCAL STORAGE LOGIC ---
    
    // Naya Bet Data
    const newBetRecord = {
      id: Date.now(),
      gameName: gameName,
      totalAmount: totalAmount,
      bets: selectedBets, // Saare numbers aur amounts
      timestamp: new Date().toLocaleString(),
      status: "Pending"
    };

    // Purani history nikalna aur naya add karna
    const existingHistory = JSON.parse(localStorage.getItem("betHistory") || "[]");
    const updatedHistory = [newBetRecord, ...existingHistory];
    
    // Save to LocalStorage
    localStorage.setItem("betHistory", JSON.stringify(updatedHistory));

    // Balance update aur save
    const newBalance = balance - totalAmount;
    setBalance(newBalance);
    localStorage.setItem("userBalance", newBalance.toString());

    alert(`✅ Bet Lag Gayi!\nGame: ${gameName}\nTotal: ₹${totalAmount}`);
    
    // Reset inputs
    setBetAmounts({});
  };

  return (
    <div className="number-grid-wrapper">
      {/* Exact Style Header */}
      <div className="game-header">
        <div className="header-left">
          <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
          <div className="title-info">
            <h3>{gameName}</h3>
            <p>Balance : ₹ {balance.toFixed(2)}</p>
          </div>
        </div>
        <button type="button" className="bet-history-top-btn">
          Bet History
        </button>
      </div>

      {/* Grid Layout - 10 Columns */}
      <div className="number-grid">
        {numbers.map((num) => (
          <div key={num} className="number-card">
            <div className="number-title">{num}</div>
            <input
              type="number"
              className="number-input"
              value={betAmounts[num] || ""}
              onChange={(e) => handleAmountChange(num, e.target.value)}
              placeholder="0"
            />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Bar */}
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