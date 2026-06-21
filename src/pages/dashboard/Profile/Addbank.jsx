import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const indianBanks = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
  "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Union Bank of India",
  "IndusInd Bank", "IDBI Bank", "Yes Bank", "Bank of India", "Central Bank of India",
  "Indian Bank", "UCO Bank", "Federal Bank", "IDFC First Bank", "Airtel Payments Bank", "Paytm Payments Bank"
];

const AddBankPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bankName: '',
    fullName: '',
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    const data = localStorage.getItem('userBankInfo');
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleSave = () => {
    if (!formData.bankName || !formData.fullName || !formData.accountNumber || !formData.ifscCode) {
      alert("Please fill all details!");
      return;
    }
    localStorage.setItem('userBankInfo', JSON.stringify(formData));
    alert("Bank details saved!");
    navigate('/withdraw'); // Navigate back to withdraw page
  };

  return (
    <div className="container">
      <header className="header">
        <span className="back-arrow" onClick={() => navigate('/withdraw')}>〈</span>
        <h1>Add a bank account number</h1>
      </header>

      <div className="content gray-bg">
        <div className="safety-alert">
          <span>ⓘ To ensure the safety of your funds, please bind your bank account</span>
        </div>

        <div className="form-group">
          <label>🏦 Choose a bank</label>
          <select 
            className="bank-select-dropdown"
            value={formData.bankName}
            onChange={(e) => setFormData({...formData, bankName: e.target.value})}
          >
            <option value="">Please select a bank</option>
            {indianBanks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>👤 Full recipient's name</label>
          <input 
            type="text" 
            placeholder="Please enter the recipient's name" 
            value={formData.fullName} 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>💳 Bank account number</label>
          <input 
            type="text" 
            placeholder="Please enter your bank account number" 
            value={formData.accountNumber} 
            onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>🔑 IFSC code</label>
          <input 
            type="text" 
            placeholder="Please enter IFSC code" 
            value={formData.ifscCode} 
            onChange={(e) => setFormData({...formData, ifscCode: e.target.value.toUpperCase()})} 
          />
        </div>

        <p className="disclaimer">
          Dear Customer, please confirm that your bound bank account number and IFSC are correct. 
          Incorrect binding information may cause your withdrawal to fail.
        </p>

        <button className="save-btn" onClick={handleSave}>
          {localStorage.getItem('userBankInfo') ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AddBankPage;