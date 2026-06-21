import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    // Check local storage for bank details when component mounts
    const storedBankDetails = localStorage.getItem('userBankInfo');
    if (storedBankDetails) {
      setBankDetails(JSON.parse(storedBankDetails));
    }
  }, []);

  // Helper function to mask account number
const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  if (accountNumber.length <= 6) return accountNumber;
  
  const firstFour = accountNumber.slice(0, 4);
  const lastThree = accountNumber.slice(-3);
  const maskedPart = '*'.repeat(accountNumber.length - 7);
  
  return `${firstFour}${maskedPart}${lastThree}`;
};

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <span className="back-arrow">〈</span>
        <h1>Withdraw</h1>
        <span className="history-link">History</span>
      </header>

      <div className="content">
        {/* Available Balance Card */}
        <div className="balance-card available-card">
          <div className="card-top">
            <span className="label"> Available balance</span>
          </div>
          <div className="balance-row">
            <span className="currency-symbol">₹</span>
            <span className="amount">0</span>
            <button className="refresh-btn">🔄</button>
          </div>
        </div>

        {/* Bank Account Section - Conditional Rendering */}
        {bankDetails ? (
          // Show bank details if available in localStorage
  <div className="bank-details-section">
  <div className="bank-details-card">
    <div className="bank-details-row">
      <span className="bank-name">{bankDetails.bankName}</span>
      <span className="account-number">{maskAccountNumber(bankDetails.accountNumber)}</span>
      <Link to="/Addbank" className="edit-link">Edit</Link>
    </div>
  </div>
</div>
        ) : (
          // Show "Add a bank account number" section if no details in localStorage
          <div className="add-bank-section">
            <Link to="/Addbank">
              <div className="dotted-box">
                <span className="plus-icon">+</span>
                <p>Add a bank account number</p>
              </div>
            </Link>
            <p className="error-text">
              Need to add beneficiary information to be able to withdraw money
            </p>
            <p className="reminder-text">
              <strong>Reminder:</strong> Dear Customer, Please confirm whether the bound bank
              number and IFSC are correct. Binding error information will cause the withdrawal 
              of coins to fail. Thanks.
            </p>
          </div>
        )}

        {/* Input Section */}
        <div className="input-container">
          <div className="input-row">
            <span className="input-currency">₹</span>
            <input 
              type="number" 
              placeholder="Please enter the amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
        
          </div>
          
          <div className="info-row">
            <span>Withdrawable balance <span className="green-text">₹0</span></span>
            <button className="all-btn">All</button>
          </div>
          
          <div className="info-row">
            <span>Withdrawal amount received</span>
            <span className="orange-text">₹0</span>
          </div>

          <button className="withdraw-btn" disabled>Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;