// src/layout/DashboardLayout.jsx

import Navbar from '../components/dashboard/common/Navbar';
import Dashboard from '../pages/dashboard/Dashboard';

function DashboardLayout() {
  return (    
    <>
    <div className='game-container'>
      <div className="main-wrapper">  
        <Dashboard/>
      </div>
      <Navbar/>
      </div>
    </>
  );
}

export default DashboardLayout;