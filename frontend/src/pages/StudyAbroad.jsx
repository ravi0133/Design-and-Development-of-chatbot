import React from 'react'
import CountryCard from '../components/CountryCard'
import { COUNTRIES } from '../utils/constants'

function StudyAbroad() {
  return (
    <div className="study-abroad-page">
      {/* Intro Section */}
      <section className="study-abroad-intro">
        <div className="section-container">
          <h1>Study Abroad Destinations</h1>
          <p>
            Discover world-class education opportunities in these top study destinations. 
            Click on any country to learn more about universities, requirements, and the application process.
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="section">
        <div className="section-container">
          <div className="countries-grid">
            {Object.values(COUNTRIES).map(country => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Study Abroad Section */}
      <section className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Why Study Abroad?</span>
            <h2 className="section-title">Transform Your Future</h2>
          </div>
          
          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🎓</div>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>World-Class Education</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Access top-ranked universities and cutting-edge research facilities.
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🌍</div>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Global Exposure</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Experience diverse cultures and build an international network.
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>💼</div>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Career Opportunities</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Enhance your career prospects with an international degree.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Your Journey With UniRoute</h2>
          </div>
          
          <div className="grid-4">
            {[
              { step: '01', title: 'Consultation', desc: 'Discuss your goals and preferences' },
              { step: '02', title: 'University Selection', desc: 'Find the best-fit universities' },
              { step: '03', title: 'Application', desc: 'Complete applications with our help' },
              { step: '04', title: 'Visa & Departure', desc: 'Get visa approval and prepare to fly' },
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  background: 'var(--primary-500)', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)'
                }}>
                  {item.step}
                </div>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudyAbroad
