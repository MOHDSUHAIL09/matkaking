import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import { 
  FaChevronLeft, FaRupeeSign, FaBolt, 
  FaRegTimesCircle, FaCheckCircle, FaRegCopy 
} from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Deposit = () => {
  // States
  const [selectedAmountLabel, setSelectedAmountLabel] = useState('300'); // Holds '300', '1K' etc.
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Amount options configuration
  const amountOptions = [
    { label: '200', value: 200 },
    { label: '300', value: 300 },
    { label: '500', value: 500 },
    { label: '1K', value: 1000 },
    { label: '5K', value: 5000 },
    { label: '50K', value: 50000 }
  ];

  // Helper: Get actual numeric value from current selection
  const getNumericAmount = () => {
    if (customAmount) return parseInt(customAmount) || 0;
    const option = amountOptions.find(opt => opt.label === selectedAmountLabel);
    return option ? option.value : 0;
  };

  const currentNumericValue = getNumericAmount();

  // Calculations
  const calculateBonus = (amt) => (amt * 0.02).toFixed(2);
  const calculateTotal = (amt) => (amt + (amt * 0.02)).toFixed(2);

  const currentBonus = calculateBonus(currentNumericValue);
  const currentTotal = calculateTotal(currentNumericValue);

  // QR Data Generator
  const getQRData = () => {
    const amt = currentNumericValue;
    if (selectedMethod === 'PhonePe') return `upi://pay?pa=phonepe@ybl&pn=Deposit&am=${amt}`;
    if (selectedMethod === 'PayTm') return `upi://pay?pa=paytm@paytm&pn=Deposit&am=${amt}`;
    if (selectedMethod === 'USDT') return `T-ExampleWalletAddress123456789`;
    return "";
  };

  // Handlers
  const handleAmountSelect = (label) => {
    setSelectedAmountLabel(label);
    setCustomAmount('');
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmountLabel('');
    }
  };

  const handleClear = () => {
    setCustomAmount('');
    setSelectedAmountLabel('300');
  };

  return (
    <div className="dps-main-container">
      {/* Header */}
      <div className="dps-header">
        <Link to="/">
        <FaChevronLeft className="dps-back-icon" />
        </Link>
        <h2 className="dps-title">Deposit</h2>
        <span className="dps-history-btn">History</span>
      </div>

      {/* Balance Card */}
      <div className="dps-balance-card">
        <div className="dps-balance-top">
          <BsWallet2 size={14} /> <span>Balance</span>
        </div>
        <div className="dps-balance-amount">
          ₹0.02 <MdOutlineRefresh className="dps-refresh" />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="dps-payment-grid">
        <div 
          className={`dps-method-item ${selectedMethod === 'PhonePe' ? 'dps-active-method' : ''}`}
          onClick={() => setSelectedMethod('PhonePe')}
        >
          <div className="dps-qr-placeholder">QR</div>
          <p>Phone Pe</p>
          {selectedMethod === 'PhonePe' && <FaCheckCircle className="dps-check" />}
        </div>

        <div 
          className={`dps-method-item ${selectedMethod === 'PayTm' ? 'dps-active-method' : ''}`}
          onClick={() => setSelectedMethod('PayTm')}
        >
          <div className="dps-qr-placeholder">UPI</div>
          <p>PayTm</p>
          {selectedMethod === 'PayTm' && <FaCheckCircle className="dps-check" />}
        </div>

        <div 
          className={`dps-method-item ${selectedMethod === 'USDT' ? 'dps-active-method' : ''}`}
          onClick={() => setSelectedMethod('USDT')}
        >
          <div className="dps-usdt-icon">T</div>
          <p>USDT</p>
          {selectedMethod === 'USDT' && <FaCheckCircle className="dps-check" />}
        </div>
      </div>

      {/* QR Code Section */}
      {selectedMethod && (
        <div className="dps-qr-display-box">
          <div className="dps-qr-header">
            <span>Pay via {selectedMethod}</span>
            <button onClick={() => setSelectedMethod(null)} className="dps-close-qr">×</button>
          </div>
          <div className="dps-qr-wrapper">
            <QRCodeCanvas value={getQRData()} size={160} />
          </div>
        </div>
      )}

      {/* Select Amount Section */}
      <div className="dps-section-box">
        <div className="dps-section-header">
          <FaBolt color="#1a8d44" /> <span>Deposit amount</span>
        </div>

        <div className="dps-amount-grid">
          {amountOptions.map((opt) => (
            <div 
              key={opt.label} 
              className={`dps-amt-item ${selectedAmountLabel === opt.label ? 'selected' : ''}`}
              onClick={() => handleAmountSelect(opt.label)}
            >
              <span className="dps-badge-red small">+2%</span>
              <FaRupeeSign size={12} /> {opt.label}
            </div>
          ))}
        </div>

        {/* Calculation Summary */}
        <div className="dps-calc-box">
          <div className="dps-you-get">
            <span>You get</span>
            <span className="dps-green-text">₹ {currentTotal}</span>
          </div>
          
          <div className="dps-progress-row">
            <span className="dps-calc-label">You pay</span>
            <div className="dps-bar-bg">
              <div className="dps-bar-fill pay" style={{width: '90%'}}></div>
            </div>
            <span className="dps-calc-val">₹ {currentNumericValue}</span>
          </div>

          <div className="dps-progress-row">
            <span className="dps-calc-label">Deposit bonus</span>
            <div className="dps-bar-bg">
              <div className="dps-bar-fill bonus" style={{width: '20%'}}></div>
            </div>
            <span className="dps-calc-val green">+ ₹ {currentBonus}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="dps-input-wrapper">
          <FaRupeeSign color="#1a8d44" />
          <div className="dps-input-divider">|</div>
          <input 
            type="text" 
            value={currentNumericValue || ''}
            onChange={handleCustomInputChange}
            placeholder="Enter amount"
          />
          {currentNumericValue > 0 && (
            <FaRegTimesCircle className="dps-clear-icon" onClick={handleClear} />
          )}
        </div>

        <button className="dps-deposit-btn" disabled={currentNumericValue <= 0}>
          Deposit ₹ {currentNumericValue}
        </button>
      </div>
    </div>
  );
};

export default Deposit;