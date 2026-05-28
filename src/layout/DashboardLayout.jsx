// src/layout/DashboardLayout.jsx
import Dashboard from '../Pages/dashboard/Dashboard';
import Navbar from '../components/dashboard/common/Navbar';

function DashboardLayout() {
  return (    
    <>
    <div className='game-container'>
      <div className="main-wrapper">  
        <Dashboard />
      </div>
      <Navbar/>
      </div>
    </>
  );
}

export default DashboardLayout;