// Country Information
export const COUNTRIES = {
  usa: {
    name: 'United States',
    code: 'usa',
    flag: '🇺🇸',
    color: '#1a365d',
    description: 'Home to world-renowned universities and diverse academic programs.',
    highlights: ['Ivy League Universities', 'OPT Work Opportunities', 'Research Excellence'],
    popularPrograms: ['Computer Science', 'Business', 'Engineering', 'Medicine'],
    avgTuition: '$20,000 - $60,000/year',
    currency: 'USD'
  },
  uk: {
    name: 'United Kingdom',
    code: 'uk',
    flag: '🇬🇧',
    color: '#1e3a5f',
    description: 'Rich academic heritage with globally recognized degrees.',
    highlights: ['1-Year Masters Programs', 'Post-Study Work Visa', 'Historic Universities'],
    popularPrograms: ['Business', 'Law', 'Arts & Humanities', 'Sciences'],
    avgTuition: '£15,000 - £35,000/year',
    currency: 'GBP'
  },
  australia: {
    name: 'Australia',
    code: 'australia',
    flag: '🇦🇺',
    color: '#1e4d2b',
    description: 'High quality of life with excellent post-study work options.',
    highlights: ['2-4 Year Post-Study Work', 'High Living Standards', 'Multicultural Society'],
    popularPrograms: ['Engineering', 'Healthcare', 'IT', 'Business'],
    avgTuition: 'AUD 25,000 - 45,000/year',
    currency: 'AUD'
  },
  germany: {
    name: 'Germany',
    code: 'germany',
    flag: '🇩🇪',
    color: '#2d3748',
    description: 'Tuition-free education at public universities with strong industry ties.',
    highlights: ['Low/No Tuition Fees', 'Strong Engineering Programs', '18-Month Job Seeker Visa'],
    popularPrograms: ['Engineering', 'Automotive', 'Sciences', 'Technology'],
    avgTuition: '€0 - €3,000/year (public)',
    currency: 'EUR'
  },
  india: {
    name: 'India',
    code: 'india',
    flag: '🇮🇳',
    color: '#744210',
    description: 'Affordable quality education with cultural familiarity.',
    highlights: ['Affordable Education', 'IITs & IIMs', 'Similar Culture'],
    popularPrograms: ['Medicine', 'Engineering', 'Management', 'IT'],
    avgTuition: '₹50,000 - ₹5,00,000/year',
    currency: 'INR'
  }
}

// Document Requirements by Country
export const DOCUMENTS = {
  common: [
    'Valid Passport',
    'Academic Transcripts',
    'Degree Certificates',
    'Statement of Purpose (SOP)',
    'Letters of Recommendation (LOR)',
    'CV/Resume',
    'Passport Size Photographs',
    'Financial Documents/Bank Statements'
  ],
  usa: [
    'TOEFL/IELTS Score',
    'GRE/GMAT Score',
    'I-20 Form',
    'DS-160 Confirmation',
    'SEVIS Fee Receipt',
    'Visa Interview Preparation'
  ],
  uk: [
    'IELTS/TOEFL Score',
    'CAS Letter',
    'TB Test Certificate',
    'ATAS Certificate (if required)',
    'Immigration Health Surcharge'
  ],
  australia: [
    'IELTS/PTE Score',
    'GTE Statement',
    'CoE (Confirmation of Enrollment)',
    'Health Insurance (OSHC)',
    'Health Examination'
  ],
  germany: [
    'TestDaF/IELTS/TOEFL Score',
    'APS Certificate',
    'Blocked Account (€11,208)',
    'University Admission Letter',
    'Health Insurance'
  ],
  india: [
    'Entrance Exam Scores (if applicable)',
    'Migration Certificate',
    'Character Certificate',
    'Medical Fitness Certificate'
  ]
}

// Services offered
export const SERVICES = [
  {
    id: 1,
    title: 'University Selection',
    description: 'Personalized university recommendations based on your profile, preferences, and career goals.',
    icon: 'GraduationCap'
  },
  {
    id: 2,
    title: 'Application Assistance',
    description: 'End-to-end support for university applications including document preparation and review.',
    icon: 'FileText'
  },
  {
    id: 3,
    title: 'Visa Guidance',
    description: 'Complete visa application support with documentation and interview preparation.',
    icon: 'Plane'
  },
  {
    id: 4,
    title: 'Test Preparation',
    description: 'Guidance for IELTS, TOEFL, GRE, GMAT, and other standardized tests.',
    icon: 'BookOpen'
  },
  {
    id: 5,
    title: 'Scholarship Assistance',
    description: 'Help identify and apply for scholarships and financial aid opportunities.',
    icon: 'Award'
  },
  {
    id: 6,
    title: 'Pre-Departure Support',
    description: 'Orientation sessions covering accommodation, banking, and life abroad.',
    icon: 'Compass'
  }
]

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    university: 'Stanford University, USA',
    text: 'UniRoute made my dream of studying in the US a reality. Their guidance was invaluable.',
    image: null
  },
  {
    id: 2,
    name: 'Rajesh Thapa',
    university: 'University of Melbourne, Australia',
    text: 'The team helped me navigate the complex visa process smoothly. Highly recommended!',
    image: null
  },
  {
    id: 3,
    name: 'Anita Gurung',
    university: 'TU Munich, Germany',
    text: 'Thanks to UniRoute, I got into a tuition-free program in Germany. Forever grateful!',
    image: null
  }
]

// Statistics
export const STATS = [
  { label: 'Students Placed', value: '5000+' },
  { label: 'Partner Universities', value: '200+' },
  { label: 'Countries', value: '5' },
  { label: 'Success Rate', value: '95%' }
]
