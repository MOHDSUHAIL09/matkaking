import React from 'react';

const Dashboard = () => {  
  return (
    <div className="container mt-4" style={{ paddingBottom: '80px' }}>
      <div className="row g-2">
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
    </div>
  );
};

export default Dashboard;