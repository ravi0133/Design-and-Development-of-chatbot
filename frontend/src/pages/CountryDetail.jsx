import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Check, ArrowLeft, MessageCircle, DollarSign, Clock, FileText } from 'lucide-react'
import { COUNTRIES, DOCUMENTS } from '../utils/constants'

function CountryDetail() {
  const { country } = useParams()
  const countryData = COUNTRIES[country]

  // If country not found
  if (!countryData) {
    return (
      <div className="section" style={{ marginTop: '120px', textAlign: 'center' }}>
        <h1>Country Not Found</h1>
        <p>The country you're looking for doesn't exist.</p>
        <Link to="/study-abroad" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
          <ArrowLeft size={18} /> Back to Study Abroad
        </Link>
      </div>
    )
  }

  const commonDocs = DOCUMENTS.common
  const countryDocs = DOCUMENTS[country] || []

  return (
    <div className="country-detail-page">
      {/* Hero Section */}
      <section className="country-hero" style={{ background: countryData.color }}>
        <div className="country-hero-container">
          <Link 
            to="/study-abroad" 
            style={{ 
              color: 'white', 
              opacity: 0.8, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--text-sm)'
            }}
          >
            <ArrowLeft size={16} /> Back to all countries
          </Link>
          
          <div className="country-hero-content">
            <span className="country-hero-flag">{countryData.flag}</span>
            <div>
              <h1>Study in {countryData.name}</h1>
              <p>{countryData.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="section-container">
          <div className="country-info-grid">
            {/* Left Column - Details */}
            <div>
              {/* Highlights */}
              <div className="country-info-card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Why Study in {countryData.name}?</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {countryData.highlights.map((highlight, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3) 0',
                      borderBottom: '1px solid var(--gray-100)'
                    }}>
                      <Check size={18} style={{ color: 'var(--success)' }} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Programs */}
              <div className="country-info-card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Popular Programs</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  {countryData.popularPrograms.map((program, index) => (
                    <span key={index} style={{
                      background: 'var(--primary-50)',
                      color: 'var(--primary-600)',
                      padding: 'var(--space-2) var(--space-4)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-sm)'
                    }}>
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div className="country-info-card">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <FileText size={20} /> Required Documents
                </h3>
                
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
                  Common Documents
                </h4>
                <ul className="document-list">
                  {commonDocs.map((doc, index) => (
                    <li key={index}>
                      <Check size={16} /> {doc}
                    </li>
                  ))}
                </ul>

                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
                  {countryData.name}-Specific Documents
                </h4>
                <ul className="document-list">
                  {countryDocs.map((doc, index) => (
                    <li key={index}>
                      <Check size={16} /> {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Quick Info & CTA */}
            <div>
              {/* Quick Facts */}
              <div className="country-info-card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Quick Facts</h3>
                
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--primary-50)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-500)'
                    }}>
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Average Tuition</div>
                      <div style={{ fontWeight: 600 }}>{countryData.avgTuition}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--primary-50)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-500)'
                    }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Currency</div>
                      <div style={{ fontWeight: 600 }}>{countryData.currency}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="country-info-card" style={{ background: 'var(--primary-500)', color: 'white' }}>
                <h3 style={{ color: 'white' }}>Need Help?</h3>
                <p style={{ opacity: 0.9, fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                  Our AI advisor can answer your questions about studying in {countryData.name}.
                </p>
                <Link 
                  to="/help" 
                  className="btn btn-white" 
                  style={{ marginTop: 'var(--space-4)', width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} /> Chat with AI Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CountryDetail
