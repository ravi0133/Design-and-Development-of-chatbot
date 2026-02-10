import React from 'react'
import { Quote } from 'lucide-react'

function TestimonialCard({ testimonial }) {
  const { name, university, text } = testimonial

  // Get initials for avatar
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <div className="card testimonial-card">
      <Quote size={32} style={{ color: 'var(--primary-200)', marginBottom: 'var(--space-4)' }} />
      <p className="testimonial-card-text">"{text}"</p>
      <div className="testimonial-card-author">
        <div className="testimonial-card-avatar">{initials}</div>
        <div className="testimonial-card-info">
          <h4>{name}</h4>
          <p>{university}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
