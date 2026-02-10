import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function CountryCard({ country }) {
  const { code, name, flag, description, highlights } = country

  return (
    <Link to={`/study-abroad/${code}`} className="card country-card">
      <div className="country-card-flag">{flag}</div>
      <h3 className="country-card-name">{name}</h3>
      <p className="country-card-description">{description}</p>
      <div className="country-card-highlights">
        {highlights.slice(0, 3).map((highlight, index) => (
          <span key={index} className="country-card-tag">{highlight}</span>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--primary-500)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
        Learn More <ArrowRight size={16} />
      </div>
    </Link>
  )
}

export default CountryCard
