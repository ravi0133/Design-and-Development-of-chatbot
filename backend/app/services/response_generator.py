"""
UniRoute - Response Generator Service
Generates natural language responses from RAG results
"""

import logging
from typing import List, Tuple, Optional
from app.utils.document_templates import get_document_checklist, get_country_info

logger = logging.getLogger(__name__)


class ResponseGenerator:
    """
    Generates human-readable responses from RAG search results
    Since we're not using an LLM, we use template-based responses
    """
    
    def __init__(self):
        self.templates = self._load_templates()
    
    def _load_templates(self) -> dict:
        """Load response templates"""
        return {
            "university_recommendation": """Based on our database of student admissions, here are some insights:

{results}

**Key Statistics:**
{stats}

💡 **Tip:** These are based on historical admission data. Individual results may vary based on your complete profile.""",

            "document_info": """Here are the required documents for studying in {country}:

**Common Documents:**
{common_docs}

**{country}-Specific Requirements:**
{country_docs}

📋 Make sure to start gathering these documents early in your application process!""",

            "comparison": """Here's a comparison based on our data:

{comparison_data}

Each country has its unique advantages. Consider factors like budget, career goals, and personal preferences when making your decision.""",

            "general_info": """Based on the information in our database:

{info}

Feel free to ask more specific questions about universities, requirements, or application processes!""",

            "no_results": """I couldn't find specific information matching your query in our database. 

Here are some suggestions:
• Try being more specific about the country or program
• Ask about specific universities or test score requirements
• Inquire about document requirements for a particular country

How else can I help you?""",

            "greeting": """Hello! 👋 I'm UniRoute's AI Advisor. I can help you with:

• University recommendations based on your profile
• Required documents for different countries
• Test score requirements (GRE, GMAT, IELTS, TOEFL)
• Comparing universities and countries
• Application guidance

What would you like to know about studying abroad?"""
        }
    
    def generate_response(
        self,
        query: str,
        search_results: List[Tuple[dict, float]],
        country: Optional[str] = None
    ) -> str:
        """
        Generate a response based on search results
        
        Args:
            query: Original user query
            search_results: List of (document, score) tuples
            country: Optional country filter
            
        Returns:
            Generated response string
        """
        query_lower = query.lower()
        
        # Check for greeting
        if self._is_greeting(query_lower):
            return self.templates["greeting"]
        
        # Check for document-related queries
        if self._is_document_query(query_lower):
            return self._generate_document_response(query_lower, country)
        
        # Check for comparison queries
        if self._is_comparison_query(query_lower):
            return self._generate_comparison_response(query_lower, search_results)
        
        # No results found
        if not search_results:
            return self.templates["no_results"]
        
        # Generate response from search results
        return self._generate_results_response(query, search_results, country)
    
    def _is_greeting(self, query: str) -> bool:
        """Check if query is a greeting"""
        greetings = ["hello", "hi", "hey", "good morning", "good afternoon", 
                     "good evening", "help", "what can you do", "namaste"]
        return any(g in query for g in greetings)
    
    def _is_document_query(self, query: str) -> bool:
        """Check if query is about documents"""
        doc_keywords = ["document", "requirement", "need", "visa", "paperwork",
                       "ielts", "toefl", "gre", "gmat", "transcript", "sop", 
                       "lor", "passport", "what do i need"]
        return any(kw in query for kw in doc_keywords)
    
    def _is_comparison_query(self, query: str) -> bool:
        """Check if query is comparing countries/universities"""
        comparison_keywords = ["compare", "vs", "versus", "better", "difference",
                              "which country", "should i choose"]
        return any(kw in query for kw in comparison_keywords)
    
    def _generate_document_response(self, query: str, country: Optional[str]) -> str:
        """Generate document checklist response"""
        # Detect country from query if not provided
        if not country:
            country = self._detect_country(query)
        
        if country:
            docs = get_document_checklist(country)
            country_info = get_country_info(country)
            country_name = country_info.get("name", country.upper())
            
            common_docs = "\n".join([f"✅ {doc}" for doc in docs["common"]])
            country_docs = "\n".join([f"✅ {doc}" for doc in docs["country_specific"]])
            
            return self.templates["document_info"].format(
                country=country_name,
                common_docs=common_docs,
                country_docs=country_docs
            )
        else:
            return """Please specify which country you're interested in for document requirements:

• 🇺🇸 USA - TOEFL/IELTS, GRE/GMAT, I-20, DS-160
• 🇬🇧 UK - IELTS, CAS Letter, TB Test
• 🇦🇺 Australia - IELTS/PTE, CoE, OSHC
• 🇩🇪 Germany - TestDaF/IELTS, APS Certificate, Blocked Account
• 🇮🇳 India - Entrance Exams, Migration Certificate

Which country would you like to know about?"""
    
    def _generate_comparison_response(
        self, 
        query: str, 
        search_results: List[Tuple[dict, float]]
    ) -> str:
        """Generate comparison response"""
        countries_mentioned = []
        for c in ["usa", "uk", "australia", "germany", "india"]:
            if c in query or (c == "usa" and "us " in query) or (c == "uk" and "britain" in query):
                countries_mentioned.append(c)
        
        if len(countries_mentioned) < 2:
            return """To help you compare, please mention at least two countries. For example:
            
• "Compare USA vs UK for MS in Computer Science"
• "Which is better for engineering: Germany or Australia?"
• "USA vs Canada for MBA programs"

Which countries would you like to compare?"""
        
        comparison_data = []
        for country in countries_mentioned[:2]:
            info = get_country_info(country)
            comparison_data.append(f"""
**{info['flag']} {info['name']}**
• Tuition: {info['avg_tuition']}
• Highlights: {', '.join(info['highlights'][:3])}
• Popular Programs: {', '.join(info['popular_programs'][:3])}
""")
        
        return self.templates["comparison"].format(
            comparison_data="\n".join(comparison_data)
        )
    
    def _generate_results_response(
        self,
        query: str,
        search_results: List[Tuple[dict, float]],
        country: Optional[str]
    ) -> str:
        """Generate response from search results"""
        # Group results by university
        universities = {}
        for doc, score in search_results[:10]:
            metadata = doc.get("metadata", {})
            univ = metadata.get("university", "Unknown")
            
            if univ not in universities:
                universities[univ] = {
                    "country": metadata.get("country", "Unknown"),
                    "programs": set(),
                    "admitted": 0,
                    "total": 0
                }
            
            universities[univ]["programs"].add(metadata.get("program", ""))
            universities[univ]["total"] += 1
            if metadata.get("admitted"):
                universities[univ]["admitted"] += 1
        
        # Format results
        result_lines = []
        for univ, data in list(universities.items())[:5]:
            programs = ", ".join(list(data["programs"])[:2]) if data["programs"] else "Various"
            admit_rate = (data["admitted"] / data["total"] * 100) if data["total"] > 0 else 0
            
            result_lines.append(
                f"🎓 **{univ}** ({data['country']})\n"
                f"   Programs: {programs}\n"
                f"   Sample Admit Rate: {admit_rate:.0f}% ({data['admitted']}/{data['total']} in our data)"
            )
        
        results_text = "\n\n".join(result_lines) if result_lines else "No specific university matches found."
        
        # Generate stats
        total_results = len(search_results)
        admitted_count = sum(1 for doc, _ in search_results if doc.get("metadata", {}).get("admitted"))
        
        stats = f"""• Found {total_results} relevant admission cases
• {admitted_count} resulted in admission ({admitted_count/total_results*100:.0f}% success rate in sample)"""
        
        if country:
            stats += f"\n• Filtered by country: {country.upper()}"
        
        return self.templates["university_recommendation"].format(
            results=results_text,
            stats=stats
        )
    
    def _detect_country(self, query: str) -> Optional[str]:
        """Detect country from query text"""
        country_map = {
            "usa": ["usa", "us ", "united states", "america"],
            "uk": ["uk", "united kingdom", "britain", "england"],
            "australia": ["australia", "aussie"],
            "germany": ["germany", "german"],
            "india": ["india", "indian"]
        }
        
        for country, keywords in country_map.items():
            if any(kw in query for kw in keywords):
                return country
        
        return None


# Global response generator instance
response_generator = ResponseGenerator()
