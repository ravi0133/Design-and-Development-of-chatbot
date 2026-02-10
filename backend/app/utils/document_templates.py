"""
UniRoute - Document Templates and Country Information
Static data for document requirements and country details
"""

# Common documents required for all countries
COMMON_DOCUMENTS = [
    "Valid Passport (min 6 months validity)",
    "Academic Transcripts (all semesters)",
    "Degree Certificates / Provisional Certificate",
    "Statement of Purpose (SOP)",
    "Letters of Recommendation (2-3 LORs)",
    "Updated CV/Resume",
    "Passport Size Photographs",
    "Bank Statements (3-6 months)",
    "Financial Support Documents",
    "English Language Proficiency Score"
]

# Country-specific document requirements
COUNTRY_DOCUMENTS = {
    "usa": [
        "TOEFL Score (min 80-100 iBT) or IELTS (min 6.5-7.0)",
        "GRE Score (for MS/PhD) - typically 310+",
        "GMAT Score (for MBA) - typically 650+",
        "I-20 Form from University",
        "DS-160 Confirmation Page",
        "SEVIS Fee Payment Receipt ($350)",
        "Visa Interview Appointment Confirmation",
        "Financial Evidence ($50,000+ per year)",
        "Affidavit of Support (if sponsored)"
    ],
    "uk": [
        "IELTS Academic (min 6.0-7.0) or equivalent",
        "CAS (Confirmation of Acceptance for Studies)",
        "TB Test Certificate (for Nepal)",
        "ATAS Certificate (for restricted subjects)",
        "Immigration Health Surcharge Payment",
        "Maintenance Funds (£1,334/month London, £1,023 outside)",
        "Previous UK Visa (if any)",
        "Police Clearance Certificate"
    ],
    "australia": [
        "IELTS Academic (min 6.0-6.5) or PTE (min 50-58)",
        "GTE Statement (Genuine Temporary Entrant)",
        "CoE (Confirmation of Enrollment)",
        "OSHC (Overseas Student Health Cover)",
        "Health Examination Results",
        "Police Clearance Certificate",
        "Evidence of Funds (AUD 21,041/year + tuition)",
        "English Proficiency Waiver (if applicable)"
    ],
    "germany": [
        "TestDaF (min TDN 4) or IELTS/TOEFL for English programs",
        "APS Certificate (Akademische Prüfstelle)",
        "Blocked Account (€11,208 minimum)",
        "University Admission Letter (Zulassungsbescheid)",
        "Health Insurance (Public or Private)",
        "Proof of German Language (if required)",
        "Motivation Letter",
        "School Leaving Certificate (Class 12)"
    ],
    "india": [
        "Entrance Exam Scores (GATE, CAT, NEET, etc.)",
        "Migration Certificate",
        "Character Certificate",
        "Medical Fitness Certificate",
        "Caste Certificate (if applicable)",
        "Domicile Certificate (for some institutions)",
        "Gap Certificate (if applicable)",
        "NOC from Previous Institution"
    ]
}

# Country information
COUNTRY_INFO = {
    "usa": {
        "name": "United States",
        "code": "usa",
        "flag": "🇺🇸",
        "description": "Home to world-renowned universities and diverse academic programs with excellent research opportunities.",
        "highlights": [
            "Ivy League & Top Research Universities",
            "OPT (1-3 years work permit after study)",
            "Diverse Program Options",
            "Strong Industry Connections",
            "Scholarship Opportunities"
        ],
        "popular_programs": [
            "Computer Science",
            "Data Science",
            "Business Analytics",
            "MBA",
            "Engineering",
            "Medicine"
        ],
        "avg_tuition": "$20,000 - $60,000/year",
        "living_cost": "$15,000 - $25,000/year",
        "currency": "USD",
        "visa_type": "F-1 Student Visa",
        "work_rights": "20 hrs/week during study, OPT after"
    },
    "uk": {
        "name": "United Kingdom",
        "code": "uk",
        "flag": "🇬🇧",
        "description": "Rich academic heritage with globally recognized degrees and shorter program durations.",
        "highlights": [
            "1-Year Master's Programs",
            "2-Year Post-Study Work Visa",
            "Historic & Prestigious Universities",
            "Multicultural Environment",
            "Gateway to Europe"
        ],
        "popular_programs": [
            "Business & Management",
            "Law",
            "Arts & Humanities",
            "Engineering",
            "Finance",
            "Sciences"
        ],
        "avg_tuition": "£15,000 - £35,000/year",
        "living_cost": "£12,000 - £15,000/year",
        "currency": "GBP",
        "visa_type": "Student Visa (Tier 4)",
        "work_rights": "20 hrs/week during study, 2-year PSW after"
    },
    "australia": {
        "name": "Australia",
        "code": "australia",
        "flag": "🇦🇺",
        "description": "High quality of life with excellent post-study work options and pathway to PR.",
        "highlights": [
            "2-4 Year Post-Study Work Visa",
            "Pathway to Permanent Residency",
            "High Living Standards",
            "Multicultural Society",
            "Strong Economy"
        ],
        "popular_programs": [
            "Engineering",
            "Healthcare & Nursing",
            "Information Technology",
            "Business",
            "Hospitality",
            "Education"
        ],
        "avg_tuition": "AUD 25,000 - 45,000/year",
        "living_cost": "AUD 21,000 - 25,000/year",
        "currency": "AUD",
        "visa_type": "Student Visa (Subclass 500)",
        "work_rights": "Unlimited work hours now, 2-4 year PSW"
    },
    "germany": {
        "name": "Germany",
        "code": "germany",
        "flag": "🇩🇪",
        "description": "Tuition-free education at public universities with strong industry connections.",
        "highlights": [
            "Free/Low Tuition at Public Universities",
            "Strong Engineering Programs",
            "18-Month Job Seeker Visa",
            "Hub for Automotive & Tech Industry",
            "Central European Location"
        ],
        "popular_programs": [
            "Mechanical Engineering",
            "Automotive Engineering",
            "Computer Science",
            "Business",
            "Natural Sciences",
            "Economics"
        ],
        "avg_tuition": "€0 - €3,000/year (public)",
        "living_cost": "€10,000 - €12,000/year",
        "currency": "EUR",
        "visa_type": "Student Visa (National Visa)",
        "work_rights": "120 full days/year, 18-month job seeker after"
    },
    "india": {
        "name": "India",
        "code": "india",
        "flag": "🇮🇳",
        "description": "Affordable quality education with cultural familiarity and growing global recognition.",
        "highlights": [
            "Affordable Education",
            "Prestigious IITs & IIMs",
            "Cultural Similarity for Nepalese",
            "No Visa Required",
            "Growing IT & Startup Hub"
        ],
        "popular_programs": [
            "Medicine (MBBS)",
            "Engineering",
            "Management (MBA)",
            "Information Technology",
            "Pharmacy",
            "Design"
        ],
        "avg_tuition": "₹50,000 - ₹5,00,000/year",
        "living_cost": "₹1,00,000 - ₹2,00,000/year",
        "currency": "INR",
        "visa_type": "Not Required for Nepalese",
        "work_rights": "Varies by institution"
    }
}


def get_document_checklist(country: str) -> dict:
    """
    Get complete document checklist for a country
    
    Args:
        country: Country code (usa, uk, australia, germany, india)
        
    Returns:
        Dict with 'common' and 'country_specific' document lists
    """
    country = country.lower()
    return {
        "common": COMMON_DOCUMENTS,
        "country_specific": COUNTRY_DOCUMENTS.get(country, [])
    }


def get_country_info(country: str) -> dict:
    """
    Get detailed information about a country
    
    Args:
        country: Country code
        
    Returns:
        Dict with country information
    """
    country = country.lower()
    return COUNTRY_INFO.get(country, {
        "name": country.upper(),
        "code": country,
        "flag": "🌍",
        "description": "Information not available",
        "highlights": [],
        "popular_programs": [],
        "avg_tuition": "Contact for details",
        "currency": "N/A"
    })


def get_all_countries() -> list:
    """Get list of all available countries"""
    return list(COUNTRY_INFO.values())
