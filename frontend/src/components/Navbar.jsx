import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    navigate('/')
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/study-abroad', label: 'Study Abroad' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <GraduationCap size={24} />
          </div>
          <span className="navbar-logo-text">UniRoute</span>
        </Link>

        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-auth">
          {currentUser ? (
            <div className="navbar-user">
              <button 
                className="navbar-user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="navbar-user-avatar"
                  />
                ) : (
                  <div className="navbar-user-avatar-placeholder">
                    <User size={18} />
                  </div>
                )}
                <span className="navbar-user-name">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="navbar-user-menu">
                  <Link to="/help" onClick={() => setShowUserMenu(false)}>
                    AI Advisor
                  </Link>
                  <button onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-login-btn">
                Sign In
              </Link>
              <Link to="/signup" className="navbar-cta">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map(link => (
            <NavLink 
              key={link.path}
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {currentUser ? (
            <>
              <Link to="/help" onClick={() => setIsMobileMenuOpen(false)}>
                AI Advisor
              </Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
