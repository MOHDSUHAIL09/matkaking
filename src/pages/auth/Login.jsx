import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../api/apiClient";
import './auth.css'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.loginId) {
      toast.error("Please enter your Login ID!");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password!");
      return;
    }

    setLoading(true);

    const payload = {
      loginId: formData.loginId,
      password: formData.password,
      deviceId: "web-browser"
    };

    console.log("📤 Sending payload:", payload);

    try {
      const response = await apiClient.post("/Authentication/login", payload);

      if (response.data.success === true || response.data.statusCode === 200) {
        const userData = response.data.data;
        const token = response.data.token;
        
        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("regno", userData.Regno || userData.regno);
        localStorage.setItem("isLoggedIn", "true");
        
        toast.success("✅ Login Successful!");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(response.data.message || "❌ Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      if (error.response?.status === 401) {
        toast.error("⚠️ Invalid Login ID or Password!");
      } else if (error.response?.status === 404) {
        toast.error("⚠️ User not found! Please sign up first.");
      } else if (error.response?.status === 429) {
        toast.error("⏰ Too many attempts! Please wait 30 seconds.");
      } else {
        const errorMsg = error.response?.data?.message || error.message || "Server Error";
        toast.error(`❌ ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid rgba(255,215,0,0.3)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          },
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            },
          },
        }}
      />
      
      <div className="mediic-appoinment">    
        <div className="auth-form">
          <div className="mediic-section-title22">
            <h4>LOGIN ACCOUNT</h4>
            <h3 className="Sign-text">Login to your account</h3>
          </div>
          
          <div className="contact-form-box">
            <form onSubmit={handleLogin}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-box">
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                      <input 
                        type="text" 
                        name="loginId" 
                        placeholder="Login ID*" 
                        value={formData.loginId} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-box">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password*" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <p className="signup-footer-text">
                    Forgot password?{" "}
                    <Link to="/forgot-password" className="colorr">Reset Here</Link>
                  </p>
                </div>
                
                <div className="col-lg-12">
                  <p className="signup-footer-text">
                    Don't have an account? 
                    <Link to="/signup" className="colorr">Create Account</Link>
                  </p>
                </div>
                
                <div className="col-lg-12">
                  <button type="submit" className="laboix-btn" disabled={loading}>
                    {loading ? "⏳ Logging in..." : "🔐 Login Now"} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" fill="currentColor" className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;