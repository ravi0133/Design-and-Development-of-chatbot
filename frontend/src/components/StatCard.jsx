import React from 'react'

function StatCard({ value, label }) {
  return (
    <div className="card stat-card">
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )
}

export default StatCard
