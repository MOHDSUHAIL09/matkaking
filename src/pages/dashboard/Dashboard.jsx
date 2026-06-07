import React, { useState } from 'react';
import matka1 from '../../assets/matka-1.png'
import { FaBullhorn } from 'react-icons/fa';

const Dashboard = () => {  
  const [bets, setBets] = useState([]);
  const [betAmounts, setBetAmounts] = useState({});

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

  const handleAmountChange = (number, value) => {
    setBetAmounts({
      ...betAmounts,
      [number]: value
    });
  };

  const handlePlaceBet = (number) => {
    const amount = betAmounts[number];
    
    if (!amount || amount <= 0) {
      alert(`Please enter valid bet amount for number ${number}`);
      return;
    }
    
    const newBet = {
      number: number,
      amount: amount,
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString()
    };
    
    setBets([newBet, ...bets]);
    
    // Clear the amount for this number after betting
    setBetAmounts({
      ...betAmounts,
      [number]: ''
    });
    
    alert(`✅ Bet of ₹${amount} placed on number ${number}`);
  };

  return (
    <div className="dashboard-container" style={{ paddingBottom: '80px' }}>

      {/* Wallet Card */}
   <div className="wallet-card">
  <div className="wallet-top">
    <div className="wallet-title">
      💰 <span>MY WALLET</span>
    </div>

    <div className="wallet-id">
      <span className="status-dot"></span>
      SK190473
    </div>
  </div>

  <div className="wallet-balance">
    ₹ 0.00
  </div>

  <div className="wallet-text">
    Available balance
  </div>

  <div className="wallet-circle"></div>
</div>

      {/* Game Categories */}
<div className="notice-bar mt-2">
  <div className="notice-icon">
    <FaBullhorn/>
  </div>

  <marquee
    behavior="scroll"
    direction="left"
    scrollAmount="5"
    className="notice-text"
  >
    किसी भी समस्या के लिए WhatsApp: 6395280490 पर संपर्क करें
  </marquee>
</div>


<div className='matka-img'>
<img src={matka1}/>
</div>




    </div>
  );
};

export default Dashboard;