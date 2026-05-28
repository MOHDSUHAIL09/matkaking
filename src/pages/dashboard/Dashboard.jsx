// src/components/dashboard/common/GameCards.jsx
import React from 'react';

const Dashboard = () => 
  const games = [
    { name: 'Popular', value: '12',  color: '#ff4757' },
    { name: 'Lottery', value: '80',  color: '#2ed573' },
    { name: 'Slots', value: '20',  color: '#ffa502' },
    { name: 'Kerala', value: '98', color: '#1e90ff' }
  ];

  return (
    <div className="container mt-4" style={{ paddingBottom: '80px' }}>
      <div className="row g-2">
        {games.map((game, index) => (
          <div className="col-3 col-md-3" key={index}>
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
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: game.color, lineHeight: '1.2' }}>
                {game.value}
              </div>
              <span className="fw-semibold" style={{ fontSize: '0.7rem', color: '#6c757d', letterSpacing: '0.3px' }}>
                {game.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;