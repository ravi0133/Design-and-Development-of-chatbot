import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CountryCard from '../components/CountryCard'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import { COUNTRIES, SERVICES, TESTIMONIALS } from '../utils/constants'

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Countries Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Destinations</span>
            <h2 className="section-title">Study in Your Dream Country</h2>
            <p className="section-description">
              Explore opportunities in top study destinations. Each country offers unique advantages for your academic and career growth.
            </p>
          </div>
          
          <div className="countries-grid">
            {Object.values(COUNTRIES).map(country => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Comprehensive Support Services</h2>
            <p className="section-description">
              From initial consultation to pre-departure guidance, we provide end-to-end support for your study abroad journey.
            </p>
          </div>
          
          <div className="services-grid">
            {SERVICES.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Success Stories</span>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-description">
              Hear from students who achieved their dreams of studying abroad with UniRoute's guidance.
            </p>
          </div>
          
          <div className="grid-3">
            {TESTIMONIALS.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Talk to our AI advisor or schedule a free consultation with our experts.</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/help" className="btn btn-white btn-lg">
              Chat with AI Advisor
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
              View Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
