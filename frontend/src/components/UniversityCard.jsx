import React from 'react'
import { MapPin, BookOpen, TrendingUp } from 'lucide-react'

function UniversityCard({ university }) {
  const { name, country, program, avgCgpa, admitRate } = university

  return (
    <div className="card">
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
        {name}
      </h3>
      <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
        <MapPin size={14} /> {country}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {program && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <BookOpen size={14} style={{ color: 'var(--primary-500)' }} />
            <span>{program}</span>
          </div>
        )}
        {avgCgpa && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <TrendingUp size={14} style={{ color: 'var(--success)' }} />
            <span>Avg CGPA: {avgCgpa}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UniversityCard
