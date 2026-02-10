import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, Chrome, Apple, ArrowRight, GraduationCap } from 'lucide-react'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signup, loginWithGoogle, loginWithApple } = useAuth()
  const navigate = useNavigate()

  // Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }
    
    setLoading(true)
    
    const result = await signup(email, password)
    
    if (result.success) {
      navigate('/help')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Google Signup
  const handleGoogleSignup = async () => {
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

  // Apple Signup
  const handleAppleSignup = async () => {
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
            <h1>Start Your Journey!</h1>
            <p>Create an account to get personalized guidance for studying abroad.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">🌍</span>
                <span>5 Countries Coverage</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">📊</span>
                <span>50,000+ Data Points</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">💬</span>
                <span>24/7 AI Assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join thousands of students on UniRoute</p>

            {/* Error Message */}
            {error && <div className="auth-error">{error}</div>}

            {/* Social Signup Buttons */}
            <div className="auth-social-buttons">
              <button 
                className="auth-social-btn google"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <Chrome size={20} />
                Continue with Google
              </button>
              
              <button 
                className="auth-social-btn apple"
                onClick={handleAppleSignup}
                disabled={loading}
              >
                <Apple size={20} />
                Continue with Apple
              </button>
            </div>

            <div className="auth-divider">
              <span>or sign up with email</span>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="auth-form">
              <div className="auth-input-group">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
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
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="auth-input-group">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="auth-terms">
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>

            <p className="auth-footer-text">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
