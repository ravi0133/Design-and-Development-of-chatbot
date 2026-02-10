import React from 'react'
import { GraduationCap, FileText, Plane, BookOpen, Award, Compass } from 'lucide-react'

const iconMap = {
  GraduationCap,
  FileText,
  Plane,
  BookOpen,
  Award,
  Compass
}

function ServiceCard({ service }) {
  const { title, description, icon } = service
  const IconComponent = iconMap[icon] || GraduationCap

  return (
    <div className="card service-card">
      <div className="service-card-icon">
        <IconComponent size={28} />
      </div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
    </div>
  )
}

export default ServiceCard
