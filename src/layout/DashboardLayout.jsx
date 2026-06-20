// src/layout/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/common/Navbar';

function DashboardLayout() {
  return (    
    <div className='dashboard-layout'>
      <div className="main-wrapper">  
        <Outlet /> {/* Child components yahan render honge */}
      </div>
      <Navbar/> {/* Navbar bottom par fix rahega */}
    </div>
  );
}

export default DashboardLayout;