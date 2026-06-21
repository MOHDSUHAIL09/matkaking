import React, { useState, useEffect } from 'react';
import '../../assets/main.css';
import matka1 from '../../assets/matka-1.png';
import { FaBullhorn, FaChevronLeft, FaChevronRight, FaTrophy } from 'react-icons/fa';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [chartData, setChartData] = useState([]);

  const gameSettings = {
    kerla: "09:00 AM",
    headrabad: "12:00 PM",
    ahmdabad: "03:00 PM",
    goa: "06:00 PM",
    mumbai: "09:00 PM",
    kolkata: "12:00 AM",
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const parseTimeToDate = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  useEffect(() => {
    const fetchOrGenerateResults = () => {
      const now = new Date();
      const today = now.getDate();
      const monthYear = `${now.getMonth()}-${now.getFullYear()}`;
      const savedData = JSON.parse(localStorage.getItem(`sattaResults_${monthYear}`) || "[]");
      
      let finalData = [...savedData];

      if (finalData.length < today) {
        for (let i = finalData.length + 1; i <= today; i++) {
          finalData.push({
            date: i.toString().padStart(2, '0'),
            kerla: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            headrabad: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            ahmdabad: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            goa: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            mumbai: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            kolkata: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
          });
        }
        localStorage.setItem(`sattaResults_${monthYear}`, JSON.stringify(finalData));
      }
      setChartData(finalData);
    };
    fetchOrGenerateResults();
  }, [currentTime.getDate()]);

  // 🔥 LATEST RESULT LOGIC
  const getLatestLiveResult = () => {
    const todayData = chartData.find(item => parseInt(item.date) === currentTime.getDate());
    if (!todayData) return null;

    let latest = null;
    let lastTime = -1;

    Object.entries(gameSettings).forEach(([key, timeStr]) => {
      const resTime = parseTimeToDate(timeStr);
      // Agar ye time nikal chuka hai, toh ye "Live" result ho sakta hai
      if (currentTime >= resTime) {
        if (resTime.getTime() > lastTime) {
          lastTime = resTime.getTime();
          latest = { name: key.toUpperCase(), number: todayData[key] };
        }
      }
    });

    return latest;
  };

  const latestResult = getLatestLiveResult();

  const shouldShowResult = (dateStr, gameKey) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const itemDate = new Date(); itemDate.setDate(parseInt(dateStr)); itemDate.setHours(0,0,0,0);

    if (itemDate < today) return true;
    if (itemDate > today) return false;

    const resultTimeStr = gameSettings[gameKey];
    const resultTime = parseTimeToDate(resultTimeStr);

    if (resultTimeStr === "12:00 AM") {
      const nextDay = new Date(today); nextDay.setDate(nextDay.getDate() + 1);
      return new Date() >= nextDay;
    }
    return new Date() >= resultTime;
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

      <div className="notice-bar">
        <div className="notice-icon"><FaBullhorn /></div>
        <marquee className="notice-text">किसी भी समस्या के लिए WhatsApp: 6395280490 पर संपर्क करें</marquee>
      </div>

      {/* 🔥 MATKA BANNER WITH LIVE RESULT OVERLAY */}
      <div className='matka-img-container'>
        <img src={matka1} alt="Main Banner" className="main-banner" />
        
        {/* Result Overlay Card */}
        <div className="live-result-overlay">
           <div className="result-card-inner">
              <p className="live-tag">🔴 LIVE RESULT</p>
              <h2 className="live-game-name">{latestResult ? latestResult.name : "WAITING..."}</h2>
              <div className="live-number-circle">
                <div className='pt-2'>
                {latestResult ? latestResult.number : "XX"}
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="current-datetime-bar">
        <div className="datetime-left">
          <span>📅 {currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="datetime-right">
          <span>🕐 {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="satta-chart-section">
        <div className="chart-header-main">Monthly Satta King Chart - {currentMonth}</div>
        <div className="chart-table-wrapper">
          <table className="satta-table">
            <thead>
              <tr>
                <th className="th-date">DATE</th>
                <th>KERLA</th>
                <th>HEADRABAD</th>
                <th>AHMDABAD</th>
                <th>GOA</th>
                <th>MUMBAI</th>
                <th>KOLKATA</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr key={index} className={parseInt(item.date) === currentTime.getDate() ? 'today-row' : ''}>
                  <td className="td-date">{item.date}</td>
                  <td>{shouldShowResult(item.date, 'kerla') ? item.kerla : 'XX'}</td>
                  <td>{shouldShowResult(item.date, 'headrabad') ? item.headrabad : 'XX'}</td>
                  <td>{shouldShowResult(item.date, 'ahmdabad') ? item.ahmdabad : 'XX'}</td>
                  <td>{shouldShowResult(item.date, 'goa') ? item.goa : 'XX'}</td>
                  <td>{shouldShowResult(item.date, 'mumbai') ? item.mumbai : 'XX'}</td>
                  <td>{shouldShowResult(item.date, 'kolkata') ? item.kolkata : 'XX'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;