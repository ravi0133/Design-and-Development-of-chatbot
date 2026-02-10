import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ color: 'white' }}>
              <div className="navbar-logo-icon">
                <GraduationCap size={24} />
              </div>
              <span className="navbar-logo-text">UniRoute</span>
            </Link>
            <p>
              Your trusted partner for overseas education. Helping Nepalese students 
              achieve their dreams of studying abroad since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/study-abroad">Study Abroad</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/help">Help & Support</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="footer-heading">Destinations</h4>
            <ul className="footer-links">
              <li><Link to="/study-abroad/usa">United States</Link></li>
              <li><Link to="/study-abroad/uk">United Kingdom</Link></li>
              <li><Link to="/study-abroad/australia">Australia</Link></li>
              <li><Link to="/study-abroad/germany">Germany</Link></li>
              <li><Link to="/study-abroad/india">India</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li>
                <MapPin size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Putalisadak, Kathmandu, Nepal
              </li>
              <li>
                <Phone size={16} style={{ display: 'inline', marginRight: '8px' }} />
                +977-1-4XXXXXX
              </li>
              <li>
                <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
                info@uniroute.com.np
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} UniRoute Education Consultancy. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
