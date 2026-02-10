"""
UniRoute - Pydantic Models/Schemas
Data validation and serialization
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class CountryCode(str, Enum):
    """Valid country codes"""
    USA = "usa"
    UK = "uk"
    INDIA = "india"
    GERMANY = "germany"
    AUSTRALIA = "australia"


class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    message: str = Field(..., min_length=1, max_length=1000, description="User's message")
    country: Optional[str] = Field(None, description="Optional country filter (usa, uk, india, germany, australia)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "What universities in USA accept 7.5 CGPA for MS in Computer Science?",
                "country": "usa"
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    response: str = Field(..., description="AI-generated response")
    sources: Optional[List[dict]] = Field(default=[], description="Source documents used")
    country_filter: Optional[str] = Field(None, description="Country filter applied")
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "Based on our data, students with 7.5 CGPA have been admitted to...",
                "sources": [{"university": "MIT", "program": "MS CS"}],
                "country_filter": "usa"
            }
        }


class UniversityInfo(BaseModel):
    """University information model"""
    name: str
    country: str
    program: Optional[str] = None
    department: Optional[str] = None
    avg_cgpa: Optional[float] = None
    admit_rate: Optional[float] = None
    common_majors: Optional[List[str]] = None


class UniversityListResponse(BaseModel):
    """Response model for university list endpoint"""
    universities: List[UniversityInfo]
    total: int
    country_filter: Optional[str] = None


class CountryStats(BaseModel):
    """Statistics for a country"""
    country: str
    total_records: int
    universities_count: int
    avg_cgpa: Optional[float] = None
    avg_gre_verbal: Optional[float] = None
    avg_gre_quant: Optional[float] = None
    avg_toefl: Optional[float] = None
    admit_rate: Optional[float] = None
    top_universities: List[str] = []
    top_programs: List[str] = []


class CountryInfo(BaseModel):
    """Country information model"""
    code: str
    name: str
    description: str
    highlights: List[str]
    popular_programs: List[str]
    avg_tuition: str
    currency: str


class DocumentRequirement(BaseModel):
    """Document requirement model"""
    document: str
    required: bool = True
    description: Optional[str] = None


class CountryDocuments(BaseModel):
    """Documents required for a country"""
    country: str
    common_documents: List[str]
    country_specific: List[str]
