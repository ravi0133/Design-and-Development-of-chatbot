import React from 'react'
import { MessageCircle, Clock, Globe, HelpCircle, Phone, Mail } from 'lucide-react'
import ChatWidget from '../components/ChatWidget'

function Help() {
  return (
    <div className="help-page">
      <div className="help-container">
        {/* Header */}
        <div className="help-header">
          <h1>Help & Support</h1>
          <p>Get instant answers from our AI advisor or reach out to our team.</p>
        </div>

        {/* Main Grid */}
        <div className="help-grid">
          {/* Left Column - Info Cards */}
          <div className="help-info">
            {/* AI Advisor Info */}
            <div className="help-card">
              <h3>
                <MessageCircle size={20} style={{ color: 'var(--primary-500)' }} />
                AI Advisor Capabilities
              </h3>
              <p>Our AI advisor can help you with:</p>
              <ul>
                <li>University recommendations based on your profile</li>
                <li>Required documents for each country</li>
                <li>Test score requirements (GRE, GMAT, IELTS, TOEFL)</li>
                <li>Application deadlines and processes</li>
                <li>Comparing universities across countries</li>
                <li>Scholarship information</li>
              </ul>
            </div>

            {/* Tips */}
            <div className="help-card">
              <h3>
                <HelpCircle size={20} style={{ color: 'var(--primary-500)' }} />
                Tips for Better Results
              </h3>
              <ul>
                <li>Select a specific country for more relevant answers</li>
                <li>Include your CGPA, test scores when asking for recommendations</li>
                <li>Be specific about your program of interest (MS, MBA, etc.)</li>
                <li>Ask follow-up questions for more details</li>
              </ul>
            </div>

            {/* Sample Questions */}
            <div className="help-card">
              <h3>
                <Globe size={20} style={{ color: 'var(--primary-500)' }} />
                Sample Questions
              </h3>
              <ul>
                <li>"What universities in USA accept 7.5 CGPA for MS in CS?"</li>
                <li>"What documents do I need for UK student visa?"</li>
                <li>"Which country is best for engineering with low budget?"</li>
                <li>"What GRE score do I need for top universities?"</li>
                <li>"Compare Australia vs Germany for MS programs"</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="help-card">
              <h3>
                <Clock size={20} style={{ color: 'var(--primary-500)' }} />
                Need Human Support?
              </h3>
              <p>Our team is available Mon-Sat, 10 AM - 6 PM NPT</p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <Phone size={16} /> +977-1-4XXXXXX
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Mail size={16} /> info@uniroute.com.np
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Chat Widget */}
          <div>
            <ChatWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
