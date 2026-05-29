import React, { useState } from 'react';
import matka1 from '../../assets/matka-1.png'

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
      <div className="card mb-3 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #96e1ff 0%, #aeddff 100%)' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500' }}>Wallet Balance</div>
              <div className='fs-3 fw-bold' style={{ color: "#00960a" }}>₹50.88</div>
            </div>
            <div>
              <button className="btn btn-light btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm" style={{ color: "#00960a", fontSize: '0.85rem' }}>
                Add Fund
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Categories */}
      <div className="row g-2 mb-4">
        {/* Game 1 - Popular */}
        <div className="col-3 col-md-3">
          <div 
            className="text-center p-2 rounded-3 shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ff4757', lineHeight: '1.2' }}>
              12
            </div>
            <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#6c757d', letterSpacing: '0.3px' }}>
              Popular
            </span>
          </div>
        </div>

        {/* Game 2 - Lottery */}
        <div className="col-3 col-md-3">
          <div 
            className="text-center p-2 rounded-3 shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2ed573', lineHeight: '1.2' }}>
              80
            </div>
            <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#6c757d', letterSpacing: '0.3px' }}>
              Lottery
            </span>
          </div>
        </div>

        {/* Game 3 - Slots */}
        <div className="col-3 col-md-3">
          <div 
            className="text-center p-2 rounded-3 shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ffa502', lineHeight: '1.2' }}>
              20
            </div>
            <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#6c757d', letterSpacing: '0.3px' }}>
              Slots
            </span>
          </div>
        </div>

        {/* Game 4 - Kerala */}
        <div className="col-3 col-md-3">
          <div 
            className="text-center p-2 rounded-3 shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e90ff', lineHeight: '1.2' }}>
              98
            </div>
            <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#6c757d', letterSpacing: '0.3px' }}>
              Kerala
            </span>
          </div>
        </div>
      </div>


<div className='matka-img'>
<img src={matka1}/>
</div>


{/* Satta Matka - Numbers with Bet Input */}
{/* Satta Matka - Numbers with Bet Input */}
<div className="card shadow-sm border-0 rounded-3 mb-4">
  <div className="card-body">
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(10, 1fr)', 
      gap: '4px' 
    }}>
      {numbers.map((num) => (
        <div key={num}>
          <div className="border rounded-1 p-1 text-center" style={{ background: '#fff' }}>
            {/* Number */}
            <div className="fw-bold" style={{ color: '#d32f2f', fontSize: '0.7rem' }}>
              {num}
            </div>
            
            {/* Amount Input */}
            <input 
              type="number" 
              className="form-control text-center"
              placeholder=""
              value={betAmounts[num] || ''}
              onChange={(e) => handleAmountChange(num, e.target.value)}
              min="1"
              style={{ fontSize: '0.6rem', padding: '2px', height: '25px' }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default Dashboard;