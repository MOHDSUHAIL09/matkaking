import React from 'react';
import '../../assets/main.css';
import matka1 from '../../assets/matka-1.png';
import { FaBullhorn, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Dashboard = () => {  

  // Satta Chart Data (Sample for June 2026)
  const chartData = [
    { date: '01', dswr: 'XX', frbd: '03', gzbd: '52', gali: '53' },
    { date: '02', dswr: '11', frbd: '51', gzbd: '29', gali: '50' },
    { date: '03', dswr: '48', frbd: '65', gzbd: '85', gali: '02' },
    { date: '04', dswr: '47', frbd: '04', gzbd: '78', gali: '16' },
    { date: '05', dswr: '78', frbd: '72', gzbd: '72', gali: '16' },
    { date: '06', dswr: '10', frbd: '32', gzbd: '66', gali: '55' },
    { date: '07', dswr: '28', frbd: '88', gzbd: '32', gali: '78' },
    { date: '08', dswr: '62', frbd: '39', gzbd: '70', gali: '66' },
    { date: '09', dswr: '26', frbd: '35', gzbd: '21', gali: '00' },
    { date: '10', dswr: '65', frbd: '85', gzbd: '33', gali: '31' },
    { date: '11', dswr: '31', frbd: '75', gzbd: '00', gali: '07' },
    { date: '12', dswr: '52', frbd: '79', gzbd: '20', gali: '59' },
    { date: '13', dswr: '71', frbd: '58', gzbd: '91', gali: '10' },
    { date: '14', dswr: '40', frbd: '23', gzbd: '52', gali: '96' },
    { date: '15', dswr: '05', frbd: '31', gzbd: '49', gali: '60' },
  ];

  return (
    <div className="dashboard-container">
      
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
        <div className="wallet-balance">₹ 0.00</div>
        <div className="wallet-text">Available balance</div>
        <div className="wallet-circle"></div>
      </div>

      {/* Notice Bar */}
      <div className="notice-bar">
        <div className="notice-icon">
          <FaBullhorn />
        </div>
        <marquee behavior="scroll" direction="left" scrollAmount="5" className="notice-text">
          किसी भी समस्या के लिए WhatsApp: 6395280490 पर संपर्क करें
        </marquee>
      </div>

      {/* Main Banner Image */}
      <div className='matka-img-container'>
        <img src={matka1} alt="Main Banner" className="main-banner" />
      </div>

      {/* --- SATTA KING CHART SECTION --- */}
      <div className="satta-chart-section">
        <div className="chart-header-main">
          Monthly Satta King Chart - June 2026
        </div>
        
        <div className="chart-table-wrapper">
          <table className="satta-table">
            <thead>
              <tr>
                <th className="th-date">DATE</th>
                <th>DSWR</th>
                <th>FRBD</th>
                <th>GZBD</th>
                <th>GALI</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr key={index}>
                  <td className="td-date">{item.date}</td>
                  <td>{item.dswr}</td>
                  <td>{item.frbd}</td>
                  <td>{item.gzbd}</td>
                  <td>{item.gali}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Month Navigation Buttons */}
        <div className="month-nav-row">
          <button className="nav-btn"><FaChevronLeft /> May 2026</button>
          <button className="nav-btn">Jul 2026 <FaChevronRight /></button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;