import React, { useState, useEffect } from 'react';
import '../../assets/main.css';
import matka1 from '../../assets/matka-1.png';
import { FaBullhorn, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [chartData, setChartData] = useState([]);

  // Har 10 second mein time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }));
      setCurrentDate(now.getDate().toString().padStart(2, '0'));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate data sirf aaj tak ki dates ke liye
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const today = now.getDate();
      const month = now.getMonth();
      const year = now.getFullYear();

      // Get days in current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const data = [];
      // Sirf 1 se lekar aaj tak ki dates
      for (let i = 1; i <= today; i++) {
        const dateStr = i.toString().padStart(2, '0');
        data.push({
          date: dateStr,
          dswr: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
          frbd: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
          gzbd: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
          gali: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
        });
      }
      setChartData(data);
    };

    generateData();
  }, [currentDate]); // Jab date change ho (midnight ke baad)

  // Game Result Times (24-hour format)
  const resultTimes = {
    dswr: { h: 5, m: 20 },   // 05:20 AM
    frbd: { h: 18, m: 10 },  // 06:10 PM
    gzbd: { h: 21, m: 30 },  // 09:30 PM
    gali: { h: 23, m: 30 },  // 11:30 PM
  };

  // Function to check if result should be shown
  const shouldShowResult = (day, gameKey) => {
    const today = parseInt(currentDate);
    const targetDay = parseInt(day);

    // 1. Agar date purani hai (past days), toh hamesha dikhao
    if (targetDay < today) return true;

    // 2. Agar aaj ki hi date hai, toh time check karo
    if (targetDay === today) {
      const timeLimit = resultTimes[gameKey];
      const checkTime = new Date();
      checkTime.setHours(timeLimit.h, timeLimit.m, 0);
      return currentTime >= checkTime;
    }

    // 3. Agar future ki date hai toh 'XX' dikhao (but future dates nahi hain data mein)
    return false;
  };

  // Get current time display
  const getCurrentTimeDisplay = () => {
    return currentTime.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="dashboard-container">
      {/* Wallet Card */}
      <div className="wallet-card">
        <div className="wallet-top">
          <div className="wallet-title">💰 <span>MY WALLET</span></div>
          <div className="wallet-id"><span className="status-dot"></span> SK190473</div>
        </div>
        <div className="wallet-balance">₹ 0.00</div>
        <div className="wallet-text">Available balance</div>
      </div>

      {/* Current Date & Time Display */}
      <div className="current-datetime-bar">
        <div className="datetime-left">
          <span className="date-display">📅 {currentTime.toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          })}</span>
        </div>
        <div className="datetime-right">
          <span className="time-display">🕐 {getCurrentTimeDisplay()}</span>
        </div>
      </div>

      <div className="notice-bar">
        <div className="notice-icon"><FaBullhorn /></div>
        <marquee className="notice-text">किसी भी समस्या के लिए WhatsApp: 6395280490 पर संपर्क करें</marquee>
      </div>

      <div className='matka-img-container'>
        <img src={matka1} alt="Main Banner" className="main-banner" />
      </div>

      {/* --- SATTA KING CHART SECTION --- */}
      <div className="satta-chart-section">
        <div className="chart-header-main">
          Monthly Satta King Chart - {currentMonth}
          <span className="days-count">({chartData.length} days)</span>
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
              {chartData.map((item, index) => {
                const isToday = item.date === currentDate;
                return (
                  <tr key={index} className={isToday ? 'today-row' : ''}>
                    <td className="td-date">
                      {item.date}
       
                    </td>
                    <td className={isToday ? 'today-result' : ''}>
                      {shouldShowResult(item.date, 'dswr') ? item.dswr : 'XX'}
                    </td>
                    <td className={isToday ? 'today-result' : ''}>
                      {shouldShowResult(item.date, 'frbd') ? item.frbd : 'XX'}
                    </td>
                    <td className={isToday ? 'today-result' : ''}>
                      {shouldShowResult(item.date, 'gzbd') ? item.gzbd : 'XX'}
                    </td>
                    <td className={isToday ? 'today-result' : ''}>
                      {shouldShowResult(item.date, 'gali') ? item.gali : 'XX'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="month-nav-row">
          <button className="nav-btn"><FaChevronLeft /> Previous</button>
          <button className="nav-btn">Next <FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;