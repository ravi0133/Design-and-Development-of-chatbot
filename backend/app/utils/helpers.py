"""
UniRoute - Helper Utilities
Common helper functions used across the application
"""

import re
from typing import Optional, List, Dict, Any


def clean_text(text: str) -> str:
    """
    Clean and normalize text
    
    Args:
        text: Input text to clean
        
    Returns:
        Cleaned text
    """
    if not text:
        return ""
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    return text


def extract_numbers(text: str) -> List[float]:
    """
    Extract all numbers from text
    
    Args:
        text: Input text
        
    Returns:
        List of numbers found
    """
    pattern = r'[-+]?\d*\.?\d+'
    matches = re.findall(pattern, text)
    return [float(m) for m in matches]


def detect_intent(query: str) -> str:
    """
    Detect the intent/type of user query
    
    Args:
        query: User's query text
        
    Returns:
        Intent string: 'greeting', 'document', 'university', 'comparison', 
                       'test_score', 'scholarship', 'general'
    """
    query_lower = query.lower()
    
    # Greeting
    if any(g in query_lower for g in ['hello', 'hi', 'hey', 'help', 'namaste']):
        return 'greeting'
    
    # Document/Visa queries
    if any(d in query_lower for d in ['document', 'visa', 'requirement', 'need', 'paperwork']):
        return 'document'
    
    # Test score queries
    if any(t in query_lower for t in ['gre', 'gmat', 'ielts', 'toefl', 'sat', 'score']):
        return 'test_score'
    
    # Comparison queries
    if any(c in query_lower for c in ['compare', 'vs', 'versus', 'better', 'difference']):
        return 'comparison'
    
    # Scholarship queries
    if any(s in query_lower for s in ['scholarship', 'funding', 'financial aid', 'free']):
        return 'scholarship'
    
    # University queries
    if any(u in query_lower for u in ['university', 'college', 'admit', 'acceptance', 'chance']):
        return 'university'
    
    return 'general'


def detect_country(query: str) -> Optional[str]:
    """
    Detect country mentioned in query
    
    Args:
        query: User's query
        
    Returns:
        Country code or None
    """
    query_lower = query.lower()
    
    country_keywords = {
        'usa': ['usa', 'us ', 'united states', 'america', 'american'],
        'uk': ['uk', 'united kingdom', 'britain', 'england', 'british'],
        'australia': ['australia', 'australian', 'aussie'],
        'germany': ['germany', 'german', 'deutschland'],
        'india': ['india', 'indian']
    }
    
    for country, keywords in country_keywords.items():
        if any(kw in query_lower for kw in keywords):
            return country
    
    return None


def format_cgpa(cgpa: float, scale: float = 10.0) -> str:
    """
    Format CGPA for display
    
    Args:
        cgpa: CGPA value
        scale: CGPA scale (default 10.0)
        
    Returns:
        Formatted string like "8.5/10"
    """
    return f"{cgpa:.2f}/{scale:.0f}"


def format_currency(amount: float, currency: str = "USD") -> str:
    """
    Format currency amount
    
    Args:
        amount: Numeric amount
        currency: Currency code
        
    Returns:
        Formatted currency string
    """
    currency_symbols = {
        'USD': '$',
        'GBP': '£',
        'EUR': '€',
        'AUD': 'A$',
        'INR': '₹',
        'NPR': 'रू'
    }
    symbol = currency_symbols.get(currency, currency + ' ')
    return f"{symbol}{amount:,.0f}"


def calculate_admit_chance(cgpa: float, gre: int = None, toefl: int = None) -> str:
    """
    Calculate rough admission chance category
    (This is a simplified estimation for UX purposes)
    
    Args:
        cgpa: CGPA on 10 scale
        gre: GRE total score
        toefl: TOEFL score
        
    Returns:
        Chance category: 'High', 'Medium', 'Low'
    """
    score = 0
    
    # CGPA contribution (max 40 points)
    if cgpa >= 9.0:
        score += 40
    elif cgpa >= 8.0:
        score += 30
    elif cgpa >= 7.0:
        score += 20
    else:
        score += 10
    
    # GRE contribution (max 30 points)
    if gre:
        if gre >= 320:
            score += 30
        elif gre >= 310:
            score += 20
        elif gre >= 300:
            score += 15
        else:
            score += 5
    
    # TOEFL contribution (max 30 points)
    if toefl:
        if toefl >= 100:
            score += 30
        elif toefl >= 90:
            score += 20
        elif toefl >= 80:
            score += 15
        else:
            score += 5
    
    # Determine category
    if score >= 70:
        return "High"
    elif score >= 50:
        return "Medium"
    else:
        return "Low"


def paginate(items: List[Any], page: int = 1, per_page: int = 20) -> Dict:
    """
    Paginate a list of items
    
    Args:
        items: List to paginate
        page: Page number (1-indexed)
        per_page: Items per page
        
    Returns:
        Dict with pagination info and items
    """
    total = len(items)
    total_pages = (total + per_page - 1) // per_page
    
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    
    return {
        "items": items[start_idx:end_idx],
        "page": page,
        "per_page": per_page,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1
    }
