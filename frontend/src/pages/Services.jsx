import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import { SERVICES } from '../utils/constants'

function Services() {
  return (
    <div className="services-page">
      {/* Intro Section */}
      <section className="services-intro">
        <div className="section-container">
          <h1>Our Services</h1>
          <p>
            Comprehensive support for every step of your study abroad journey. 
            From initial counseling to landing in your dream country.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="section-container">
          <div className="services-grid">
            {SERVICES.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Our Process</span>
            <h2 className="section-title">How We Work With You</h2>
            <p className="section-description">
              A proven step-by-step approach that has helped thousands of students achieve their dreams.
            </p>
          </div>

          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                step: 1,
                title: 'Initial Consultation',
                items: ['Understand your academic background', 'Discuss career goals and preferences', 'Evaluate financial considerations', 'Identify target countries and programs']
              },
              {
                step: 2,
                title: 'University Shortlisting',
                items: ['Research suitable universities', 'Match your profile with requirements', 'Create a balanced list of safe and reach schools', 'Review scholarship opportunities']
              },
              {
                step: 3,
                title: 'Application Support',
                items: ['SOP and essay guidance', 'LOR preparation assistance', 'Document compilation', 'Application submission and tracking']
              },
              {
                step: 4,
                title: 'Post-Admission Support',
                items: ['Visa application guidance', 'Interview preparation', 'Pre-departure orientation', 'Accommodation assistance']
              }
            ].map((phase) => (
              <div key={phase.step} className="card">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-4)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--primary-500)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {phase.step}
                  </div>
                  <h3 style={{ margin: 0 }}>{phase.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {phase.items.map((item, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-2)',
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--text-sm)'
                    }}>
                      <CheckCircle size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title">Flexible Packages</h2>
            <p className="section-description">
              We offer customized packages based on your needs. Contact us for a free consultation.
            </p>
          </div>

          <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {[
              {
                name: 'Basic',
                price: 'NPR 25,000',
                features: ['University shortlisting', 'Application review', 'Basic SOP guidance', 'Email support']
              },
              {
                name: 'Standard',
                price: 'NPR 50,000',
                popular: true,
                features: ['Everything in Basic', 'Complete SOP writing', 'Visa guidance', 'Interview prep', 'Priority support']
              },
              {
                name: 'Premium',
                price: 'NPR 75,000',
                features: ['Everything in Standard', 'Scholarship assistance', 'Pre-departure orientation', 'Post-arrival support', '24/7 support']
              }
            ].map((pkg, index) => (
              <div 
                key={index} 
                className="card"
                style={{
                  border: pkg.popular ? '2px solid var(--primary-500)' : undefined,
                  position: 'relative'
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary-500)',
                    color: 'white',
                    padding: 'var(--space-1) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>{pkg.name}</h3>
                <div style={{ 
                  textAlign: 'center', 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 700, 
                  color: 'var(--primary-500)',
                  marginBottom: 'var(--space-6)'
                }}>
                  {pkg.price}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-3)',
                      fontSize: 'var(--text-sm)'
                    }}>
                      <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/help" 
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-4)' }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Have Questions?</h2>
          <p>Our AI advisor is available 24/7 to answer your queries.</p>
          <Link to="/help" className="btn btn-white btn-lg">
            Chat Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services
