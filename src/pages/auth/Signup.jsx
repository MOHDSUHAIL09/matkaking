import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaCopy, FaCheck, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import apiClient from "../../api/apiClient";
import './auth.css'

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    introRegNo: "",
    referrer_Id: "",
    sponsorName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    smsCode: "",
    inviteCode: "",
    agreeToTerms: false,
    registrationMethod: "phone",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendSMS = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }

    setSmsSending(true);
    try {
      const response = await apiClient.post("/Authentication/send-sms", {
        phone: formData.phone,
      });

      if (response.data.success) {
        setSmsSent(true);
        toast.success("Verification code sent!");
        
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setSmsSent(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to send SMS");
      }
    } catch (error) {
      console.error("SMS send error:", error);
      toast.error("Failed to send verification code");
    } finally {
      setSmsSending(false);
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.registrationMethod === "phone") {
      if (!formData.phone || formData.phone.length !== 10) {
        toast.error("Please enter a valid 10-digit phone number!");
        return;
      }
      if (!formData.smsCode || formData.smsCode.length !== 6) {
        toast.error("Please enter the 6-digit SMS verification code!");
        return;
      }
    } else {
      if (!formData.email) {
        toast.error("Please enter your email address!");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Privacy Agreement!");
      return;
    }

    setLoading(true);

    const payload = {
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      smsCode: formData.smsCode,
      inviteCode: formData.inviteCode || null,
      introRegNo: "",
      referrer_Id: "",
      sponsorName: "",
    };

    console.log("📤 Sending payload:", payload);

    try {
      const response = await apiClient.post("/Authentication/register", payload);

      if (response.data.success === true) {
        setRegisteredUser({
          loginId: response.data.data?.loginId || formData.phone || formData.email,
          name: response.data.data?.name || "User",
          email: formData.email || "Not provided",
          phone: formData.phone || "Not provided",
          password: formData.password,
        });
        setShowSuccessModal(true);
        toast.success("✅ Registration Successful!");

        setFormData({
          introRegNo: "",
          referrer_Id: "",
          sponsorName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          smsCode: "",
          inviteCode: "",
          agreeToTerms: false,
          registrationMethod: "phone",
        });
      } else {
        toast.error(response.data.message || "❌ Registration Failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      
      if (error.response?.status === 409) {
        toast.error("⚠️ User already exists! Please try with different credentials.");
      } else if (error.response?.status === 400) {
        toast.error("⚠️ Invalid data! Please check all fields.");
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
                  <h4>SIGNUP ACCOUNT</h4>
                  <h3 className="Sign-text">Register Your Phone</h3>
                </div>
                
         
                <div className="contact-form-box">
                  <form onSubmit={handleSignup}>
                    <div className="row">
                      {formData.registrationMethod === "phone" && (
                        <>
                          <div className="col-lg-12">
                            <div className="form-box">
                              <div className="phone-input-row">
                                <span className="country-code">+91</span>
                                <input 
                                  type="tel" 
                                  name="phone" 
                                  className="phone-input"
                                  placeholder="Phone Number*" 
                                  maxLength="10" 
                                  value={formData.phone} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-box">
                              <div className="sms-row">
                                <input 
                                  type="text" 
                                  name="smsCode" 
                                  className="sms-input"
                                  placeholder="6-digit SMS verification code*" 
                                  maxLength="6" 
                                  value={formData.smsCode} 
                                  onChange={handleChange} 
                                  required 
                                />
                                <button
                                  type="button"
                                  className="send-sms-btn"
                                  onClick={handleSendSMS}
                                  disabled={smsSending || smsSent || countdown > 0}
                                >
                                  {smsSending ? "⏳ Sending..." : countdown > 0 ? `${countdown}s` : smsSent ? "✅ Sent" : "Send"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {formData.registrationMethod === "email" && (
                        <div className="col-lg-12">
                          <div className="form-box">
                            <input 
                              type="email" 
                              name="email" 
                              placeholder="Email Address*" 
                              value={formData.email} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12">
                        <div className="form-box">
                          <input 
                            type="password" 
                            name="password" 
                            placeholder="Set Password*" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-box">
                          <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password*" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-box">
                          <input 
                            type="text" 
                            name="inviteCode" 
                            placeholder="Invitation Code (optional)" 
                            value={formData.inviteCode} 
                            onChange={handleChange} 
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-box checkbox-row">
                          <input 
                            type="checkbox" 
                            name="agreeToTerms" 
                            checked={formData.agreeToTerms} 
                            onChange={handleChange} 
                            required 
                          />
                          <label>
                            I have read and agree to the <Link to="/privacy" className="privacy-link">Privacy Agreement</Link>
                          </label>
                        </div>
                      </div>
                      
                      <div className="col-lg-12">
                        <p className="signup-footer-text">
                          Already have an account? 
                          <Link to="/login" className="colorr">Login</Link>
                        </p>
                      </div>
                      
                      <div className="col-lg-12">
                        <button type="submit" className="laboix-btn" disabled={loading}>
                          {loading ? "⏳ Creating Account..." : "🔐 Register"} 
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
         

   

      {showSuccessModal && registeredUser && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="success-icon">✓</div>
              <div className="modal-title">Registration Successful</div>
              <button className="modal-close" onClick={handleModalClose}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="user-details-card">
                <div className="details-title">
                  <FaUser /> Your Account Details
                </div>

                <div className="detail-row">
                  <span className="detail-label"><FaUser /> Login ID:</span>
                  <span className="detail-value highlight">
                    {registeredUser.loginId}
                    <button className="copy-btn" onClick={() => handleCopy(registeredUser.loginId, "Login ID")}>
                      {copiedField === "Login ID" ? <FaCheck /> : <FaCopy />}
                    </button>
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><FaUser /> Name:</span>
                  <span className="detail-value">{registeredUser.name}</span>
                </div>

                {registeredUser.email && registeredUser.email !== "Not provided" && (
                  <div className="detail-row">
                    <span className="detail-label"><FaEnvelope /> Email:</span>
                    <span className="detail-value">
                      {registeredUser.email}
                      <button className="copy-btn" onClick={() => handleCopy(registeredUser.email, "Email")}>
                        {copiedField === "Email" ? <FaCheck /> : <FaCopy />}
                      </button>
                    </span>
                  </div>
                )}

                {registeredUser.phone && registeredUser.phone !== "Not provided" && (
                  <div className="detail-row">
                    <span className="detail-label"><FaPhone /> Phone:</span>
                    <span className="detail-value">
                      {registeredUser.phone}
                      <button className="copy-btn" onClick={() => handleCopy(registeredUser.phone, "Phone")}>
                        {copiedField === "Phone" ? <FaCheck /> : <FaCopy />}
                      </button>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <Link to="/login">
                  <button className="login-redirect-btn" onClick={handleModalClose}>
                    GO TO LOGIN
                  </button>  
                </Link>          
              </div>  
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;