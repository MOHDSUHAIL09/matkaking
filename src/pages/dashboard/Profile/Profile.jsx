import React from 'react';
import './Profile.css';
import { 
  IoWallet, IoDownload, IoCloudUpload, IoDocumentText, 
  IoBarChart, IoSettingsSharp, IoInformationCircle 
} from "react-icons/io5";
import { 
  FaTrophy, FaEnvelope, FaShieldAlt, FaBell, 
  FaGift, FaHeadset, FaQuestionCircle, FaChevronRight, FaRegCopy 
} from "react-icons/fa";
import { MdHistory, MdLogout, MdOutlineRefresh } from "react-icons/md";
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile-main-container">
      {/* Header Section */}
      <div className="profile-header-section">
        <div className="profile-user-info">
          <div className="profile-avatar-wrapper">
            <img 
              src="https://i.pinimg.com/736x/95/32/8b/95328b20605ffb39cbac949d4906a906.jpg" 
              alt="Avatar" 
              className="profile-avatar" 
            />
          </div>
          <div className="profile-user-details">
            <div className="profile-username-row">
              <span className="profile-username">MemberBGNJB6U</span>
              <span className="profile-vip-badge">
                <FaTrophy size={10} /> VIP1
              </span>
            </div>
            <div className="profile-uid-row">
              <span className="profile-uid-label">UID</span>
              <span className="profile-uid-value">| 92918524</span>
              <FaRegCopy size={12} className="profile-copy-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="profile-wallet-card">
        <div className="profile-wallet-actions">
          <div className="profile-action-item">
            <IoWallet size={28} color="#4caf50"/>
            <span>Wallet</span>
          </div>
            <Link to="/Deposit">
          <div className="profile-action-item">        
            <IoDownload size={28} color="#ff9800" />         
            <span>Deposit</span>
          </div>
            </Link>
          <div className="profile-action-item">
            <IoCloudUpload size={28} color="#2196f3" />
            <span>Withdraw</span>
          </div>
          <div className="profile-action-item profile-badge-container">
            <FaTrophy size={28} color="#8bc34a" />
            <span>VIP</span>
            <span className="profile-red-dot">1</span>
          </div>
        </div>
        <div className="profile-balance-info">
          <div className="profile-balance-item">
            <p className="profile-label">Available balance</p>
            <p className="profile-amount">
              ₹0.02 <MdOutlineRefresh className="profile-refresh-icon" />
            </p>
          </div>
        </div>
      </div>

      {/* History Grid */}
      <div className="profile-history-grid">
        <div className="profile-grid-card">
          <div className="profile-grid-icon profile-blue">
            <MdHistory size={24} />
          </div>
          <div>
            <p className="profile-grid-title">Game history</p>
            <p className="profile-grid-sub">My game history</p>
          </div>
        </div>
        <div className="profile-grid-card">
          <div className="profile-grid-icon profile-green">
            <IoDocumentText size={24} />
          </div>
          <div>
            <p className="profile-grid-title">Transaction</p>
            <p className="profile-grid-sub">My transaction history</p>
          </div>
        </div>
        <div className="profile-grid-card">
          <div className="profile-grid-icon profile-light-green">
            <IoWallet size={24} />
          </div>
          <div>
            <p className="profile-grid-title">Deposit</p>
            <p className="profile-grid-sub">My deposit history</p>
          </div>
        </div>
        <div className="profile-grid-card">
          <div className="profile-grid-icon profile-orange">
            <IoDownload size={24} />
          </div>
          <div>
            <p className="profile-grid-title">Withdraw</p>
            <p className="profile-grid-sub">My withdraw history</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="profile-logout-btn">
        <MdLogout size={20} /> Log out
      </button>
    </div>
  );
};

export default Profile;