// src/components/dashboard/common/BottomNav.jsx
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoGameController } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="game-container fixed-bottom">   {/* ✅ SAME CLASS */}
      <div className="bottom-nav-wrapper">          {/* ✅ SAME CLASS */}
        <div className="bottom-nav-container">      {/* ✅ SAME CLASS */}
          
          {/* HOME - Sirf Link sahi kiya, class same */}
          <Link to="/" className="nav-item">        {/* ✅ Link direct nav-item par */}
            <div className="nav-icon active-icon">  {/* ✅ SAME CLASS */}
              <FaHome />
            </div>
            <div className="nav-label active-label"> {/* ✅ SAME CLASS */}
              Home
            </div>
          </Link>

          {/* PLAY GAME - Sirf Link sahi kiya */}
          <Link to="/PlayGame" className="nav-item"> {/* ✅ Link direct nav-item par */}
            <div className="nav-icon">              {/* ✅ SAME CLASS */}
              <IoGameController />
            </div>
            <div className="nav-label">             {/* ✅ SAME CLASS */}
              Play Game
            </div>
          </Link>

          {/* SPECIAL BUTTON - Same raha */}
          <div className="nav-item special-item" onClick={() => console.log('Clicked')}>
            <div className="special-circle">        {/* ✅ SAME CLASS */}
              <span className="special-icon">+</span> {/* ✅ SAME CLASS */}
            </div>
          </div>

          {/* AGENT - Sirf Link sahi kiya */}
          <Link to="/agent" className="nav-item">   {/* ✅ Link direct nav-item par */}
            <div className="nav-icon">              {/* ✅ SAME CLASS */}
              <MdOutlineSupportAgent />
            </div>
            <div className="nav-label">             {/* ✅ SAME CLASS */}
              Agent
            </div>
          </Link>

          {/* ACCOUNT - Sirf Link sahi kiya */}
          <Link to="/Profile" className="nav-item"> {/* ✅ Link direct nav-item par */}
            <div className="nav-icon">              {/* ✅ SAME CLASS */}
              <FaUser />
            </div>
            <div className="nav-label">             {/* ✅ SAME CLASS */}
              Account
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;