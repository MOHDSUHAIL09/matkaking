// src/components/dashboard/common/Header.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from "../../../assets/logo.png";  
import './Header.css';

const Header = () => {
  return (
    <>
      {/* Top Header - BG678 Register Login */}
      <nav className="navbar navbar-expand-lg shadow-sm border-bottom header-nav">
        <div className="container-fluid px-4">
          <a className="navbar-brand brand-logo" href="#">
            {/* <img src={logo} alt="logo" style={{ height: '50px', width: '' }} /> */} 
            MatkaKing678
          </a>
          <div className="d-flex gap-2">
            <button className="btn register-btn">Register</button>
            <button className="btn login-btn">Log in</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;