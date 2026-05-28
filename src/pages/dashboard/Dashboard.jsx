// src/components/dashboard/common/GameCards.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const dashboard = () => {
  const games = [
    { name: 'Popular', icon: '12' },
    { name: 'Lottery', icon: '80' },
    { name: 'Slots', icon: '20' },
    { name: 'Kerala', icon: '98' }
  ];

  return (
    <div className="container mt-4">
      <div className="row g-2">
        {games.map((game, index) => (
          <div className="col-3 col-md-3" key={index}>  {/* col-3 kar diya */}
            <div 
              className="text-center p-3 rounded-3 shadow-sm"
              style={{ 
                background: 'white', 
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{game.icon}</div>
              <span className="fw-semibold" style={{ fontSize: '0.75rem', color: '#0369a1' }}>{game.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboard;