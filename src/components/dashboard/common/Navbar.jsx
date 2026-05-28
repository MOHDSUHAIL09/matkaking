// src/components/dashboard/common/BottomNav.jsx
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = () => {
  return (
    <div className="game-container fixed-bottom">
      <div className="bottom-nav-wrapper">
        <div className="bottom-nav-container">
          {/* Home */}
          <div className="nav-item" onClick={() => console.log('Clicked: Home')}>
            <div className="nav-icon active-icon">
              <FaHome />
            </div>
            <div className="nav-label active-label">
              Home
            </div>
          </div>

          {/* Promotion */}
          <div className="nav-item" onClick={() => console.log('Clicked: Promotion')}>
            <div className="nav-icon">
              <FaRegShareFromSquare />
            </div>
            <div className="nav-label">
              Promotion
            </div>
          </div>

          {/* GET ₹1700 */}
          <div className="nav-item special-item" onClick={() => console.log('Clicked: GET ₹1700')}>
            <div className="special-circle">
              <span className="special-icon">+</span>
            </div>
            <div className="special-label">
              GET ₹1700
            </div>
          </div>

          {/* Agent */}
          <div className="nav-item" onClick={() => console.log('Clicked: Agent')}>
            <div className="nav-icon">
              <MdOutlineSupportAgent />
            </div>
            <div className="nav-label">
              Agent
            </div>
          </div>

          {/* Account */}
          <div className="nav-item" onClick={() => console.log('Clicked: Account')}>
            <div className="nav-icon">
              <FaUser />
            </div>
            <div className="nav-label">
              Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;