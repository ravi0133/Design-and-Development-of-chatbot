import React from 'react'
import { Link } from 'react-router-dom'
import { Target, Heart, Users, Shield, Award, ArrowRight } from 'lucide-react'
import StatCard from '../components/StatCard'
import { STATS } from '../utils/constants'

function About() {
  const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'Committed to helping every student achieve their academic dreams.' },
    { icon: Heart, title: 'Student-First', desc: 'Your success is our priority. We go above and beyond for our students.' },
    { icon: Shield, title: 'Trust & Transparency', desc: 'Honest guidance with no hidden fees or false promises.' },
    { icon: Award, title: 'Excellence', desc: 'Striving for the highest standards in everything we do.' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="section-container">
          <h1>About UniRoute</h1>
          <p>
            Nepal's trusted overseas education consultancy, helping students achieve their dreams since 2015.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                UniRoute was founded with a simple mission: to make quality overseas education accessible 
                to every deserving Nepalese student. What started as a small consultancy in Kathmandu 
                has grown into one of Nepal's most trusted names in education consultancy.
              </p>
              <p>
                Over the years, we've helped thousands of students secure admissions in top universities 
                across the USA, UK, Australia, Germany, and India. Our success lies in our personalized 
                approach – we don't just process applications, we guide dreams.
              </p>
              <p>
                Today, with our AI-powered advisory system and experienced counselors, we're making 
                the study abroad journey smoother and more accessible than ever before.
              </p>
            </div>
            <div style={{ 
              background: 'var(--primary-50)', 
              borderRadius: 'var(--radius-xl)', 
              padding: 'var(--space-8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: 'var(--space-4)' }}>🎓</div>
                <p style={{ color: 'var(--primary-600)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>
                  Empowering Dreams<br />Since 2015
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Our Impact</span>
            <h2 className="section-title">Numbers That Speak</h2>
          </div>
          <div className="grid-4">
            {STATS.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="about-values" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {values.map((value, index) => (
              <div key={index} className="about-value card">
                <div className="about-value-icon">
                  <value.icon size={24} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section section-dark">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Meet the Team</span>
            <h2 className="section-title">Expert Counselors</h2>
            <p className="section-description">
              Our team of experienced education counselors brings together decades of expertise 
              in international education and student guidance.
            </p>
          </div>
          
          <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { name: 'Ravi Chaudhary', role: 'Founder & CEO', exp: '15+ years in education' },
              { name: 'Genish Kumar', role: 'Head of Counseling', exp: '10+ years experience' },
              { name: 'Saksham Mahaseth', role: 'Visa Expert', exp: '8+ years experience' }
            ].map((member, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--primary-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  color: 'var(--primary-500)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 600
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 style={{ marginBottom: 'var(--space-1)' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-500)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                  {member.role}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  {member.exp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Talk to our AI advisor or schedule a free consultation.</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/help" className="btn btn-white btn-lg">
              Chat with AI Advisor
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
              View Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
