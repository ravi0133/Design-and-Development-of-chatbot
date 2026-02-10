import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { STATS } from '../utils/constants'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">🇳🇵 Trusted by 5000+ Nepalese Students</span>
          <h1 className="hero-title">
            Your Gateway to<br />
            <span>World-Class Education</span>
          </h1>
          <p className="hero-description">
            UniRoute helps Nepalese students navigate the complex journey of studying abroad. 
            From university selection to visa approval, we're with you every step of the way.
          </p>
          <div className="hero-buttons">
            <Link to="/study-abroad" className="btn btn-white btn-lg">
              Explore Countries
              <ArrowRight size={18} />
            </Link>
            <Link to="/help" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
              <MessageCircle size={18} />
              Chat with AI Advisor
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          {STATS.map((stat, index) => (
            <div key={index} className="hero-stat-item">
              <div className="hero-stat-value">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
