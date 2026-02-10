import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Phone, Chrome, Apple, ArrowRight, GraduationCap } from 'lucide-react'

function Login() {
  const [activeTab, setActiveTab] = useState('email') // email, phone
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, loginWithGoogle, loginWithApple, sendPhoneOTP, verifyPhoneOTP } = useAuth()
  const navigate = useNavigate()

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const result = await login(email, password)
    
    if (result.success) {
      navigate('/help')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Google Login
  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    
    const result = await loginWithGoogle()
    
    if (result.success) {
      navigate('/help')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Apple Login
  const handleAppleLogin = async () => {
    setError('')
    setLoading(true)
    
    const result = await loginWithApple()
    
    if (result.success) {
      navigate('/help')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Send Phone OTP
  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Format phone number (add country code if not present)
    let formattedPhone = phone
    if (!phone.startsWith('+')) {
      formattedPhone = '+977' + phone // Default to Nepal
    }
    
    const result = await sendPhoneOTP(formattedPhone, 'recaptcha-container')
    
    if (result.success) {
      setConfirmationResult(result.confirmationResult)
      setShowOTP(true)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const result = await verifyPhoneOTP(confirmationResult, otp)
    
    if (result.success) {
      navigate('/help')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-logo">
              <GraduationCap size={48} />
              <span>UniRoute</span>
            </div>
            <h1>Welcome Back!</h1>
            <p>Sign in to access your personalized study abroad guidance and AI advisor.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">🎓</span>
                <span>University Recommendations</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">🤖</span>
                <span>AI-Powered Guidance</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">📋</span>
                <span>Document Checklists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <h2>Sign In</h2>
            <p className="auth-subtitle">Choose your preferred sign-in method</p>

            {/* Error Message */}
            {error && <div className="auth-error">{error}</div>}

            {/* Social Login Buttons */}
            <div className="auth-social-buttons">
              <button 
                className="auth-social-btn google"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Chrome size={20} />
                Continue with Google
              </button>
              
              <button 
                className="auth-social-btn apple"
                onClick={handleAppleLogin}
                disabled={loading}
              >
                <Apple size={20} />
                Continue with Apple
              </button>
            </div>

            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Tab Selector */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => { setActiveTab('email'); setShowOTP(false); }}
              >
                <Mail size={16} /> Email
              </button>
              <button 
                className={`auth-tab ${activeTab === 'phone' ? 'active' : ''}`}
                onClick={() => { setActiveTab('phone'); setShowOTP(false); }}
              >
                <Phone size={16} /> Phone
              </button>
            </div>

            {/* Email Login Form */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailLogin} className="auth-form">
                <div className="auth-input-group">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="auth-input-group">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* Phone Login Form */}
            {activeTab === 'phone' && (
              <>
                {!showOTP ? (
                  <form onSubmit={handleSendOTP} className="auth-form">
                    <div className="auth-input-group">
                      <Phone size={18} className="auth-input-icon" />
                      <input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="auth-form">
                    <p className="auth-otp-info">Enter the 6-digit code sent to {phone}</p>
                    <div className="auth-input-group">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                    
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                      <ArrowRight size={18} />
                    </button>
                    
                    <button 
                      type="button" 
                      className="auth-link-btn"
                      onClick={() => setShowOTP(false)}
                    >
                      Change phone number
                    </button>
                  </form>
                )}
              </>
            )}

            {/* reCAPTCHA container (invisible) */}
            <div id="recaptcha-container"></div>

            <p className="auth-footer-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
