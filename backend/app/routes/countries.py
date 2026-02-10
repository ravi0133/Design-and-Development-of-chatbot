"""
UniRoute - Countries Routes
API endpoints for country information
"""

from fastapi import APIRouter, HTTPException, Path
import logging
from typing import Optional
from app.services.data_loader import data_loader
from app.utils.document_templates import (
    get_country_info, 
    get_document_checklist, 
    get_all_countries,
    COUNTRY_INFO
)

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/countries")
async def get_countries():
    """
    Get list of all available countries with basic info
    
    Returns:
        List of country information
    """
    countries = get_all_countries()
    return {
        "countries": countries,
        "total": len(countries)
    }


@router.get("/countries/{country_code}")
async def get_country_detail(
    country_code: str = Path(..., description="Country code (usa, uk, india, germany, australia)")
):
    """
    Get detailed information about a specific country
    
    Args:
        country_code: Country code
        
    Returns:
        Detailed country information
    """
    country_code = country_code.lower()
    
    if country_code not in COUNTRY_INFO:
        raise HTTPException(
            status_code=404, 
            detail=f"Country '{country_code}' not found. Available: usa, uk, india, germany, australia"
        )
    
    info = get_country_info(country_code)
    documents = get_document_checklist(country_code)
    
    return {
        **info,
        "documents": documents
    }


@router.get("/countries/{country_code}/stats")
async def get_country_stats(
    country_code: str = Path(..., description="Country code")
):
    """
    Get statistics about a country from the dataset
    
    Args:
        country_code: Country code
        
    Returns:
        Statistical information about admissions to that country
    """
    country_code = country_code.lower()
    
    df = data_loader.get_dataset(country_code)
    
    if df is None:
        raise HTTPException(
            status_code=404,
            detail=f"No data available for country '{country_code}'"
        )
    
    try:
        # Calculate statistics
        stats = {
            "country": country_code,
            "total_records": len(df),
            "unique_universities": df["univName"].nunique(),
            "unique_programs": df["program"].nunique() if "program" in df else 0,
            
            # Average scores
            "avg_cgpa": round(df["cgpa"].mean(), 2) if "cgpa" in df else None,
            "avg_gre_verbal": round(df["greV"].mean(), 1) if "greV" in df else None,
            "avg_gre_quant": round(df["greQ"].mean(), 1) if "greQ" in df else None,
            "avg_toefl": round(df["toeflScore"].mean(), 1) if "toeflScore" in df else None,
            
            # Admission rate
            "overall_admit_rate": round(df["admit"].mean() * 100, 1) if "admit" in df else None,
            
            # Top lists
            "top_universities": df["univName"].value_counts().head(10).index.tolist(),
            "top_programs": df["program"].value_counts().head(10).index.tolist() if "program" in df else [],
            "top_majors": df["major"].value_counts().head(10).index.tolist() if "major" in df else [],
            
            # Score ranges (for admitted students)
            "admitted_stats": None
        }
        
        # Get stats for admitted students only
        admitted_df = df[df["admit"] == 1] if "admit" in df else None
        if admitted_df is not None and len(admitted_df) > 0:
            stats["admitted_stats"] = {
                "count": len(admitted_df),
                "avg_cgpa": round(admitted_df["cgpa"].mean(), 2) if "cgpa" in admitted_df else None,
                "min_cgpa": round(admitted_df["cgpa"].min(), 2) if "cgpa" in admitted_df else None,
                "avg_gre_total": round(
                    (admitted_df["greV"].mean() + admitted_df["greQ"].mean()), 1
                ) if "greV" in admitted_df and "greQ" in admitted_df else None,
                "avg_toefl": round(admitted_df["toeflScore"].mean(), 1) if "toeflScore" in admitted_df else None
            }
        
        return stats
        
    except Exception as e:
        logger.error(f"Country stats error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/countries/{country_code}/documents")
async def get_country_documents(
    country_code: str = Path(..., description="Country code")
):
    """
    Get document requirements for a specific country
    
    Args:
        country_code: Country code
        
    Returns:
        Document checklist for the country
    """
    country_code = country_code.lower()
    
    if country_code not in COUNTRY_INFO:
        raise HTTPException(
            status_code=404,
            detail=f"Country '{country_code}' not found"
        )
    
    documents = get_document_checklist(country_code)
    country_info = get_country_info(country_code)
    
    return {
        "country": country_info["name"],
        "country_code": country_code,
        "common_documents": documents["common"],
        "country_specific_documents": documents["country_specific"],
        "visa_type": country_info.get("visa_type", "Student Visa")
    }


@router.get("/countries/{country_code}/programs")
async def get_country_programs(
    country_code: str = Path(..., description="Country code"),
    limit: int = 20
):
    """
    Get popular programs for a country
    
    Args:
        country_code: Country code
        limit: Maximum number of programs
        
    Returns:
        List of popular programs with statistics
    """
    country_code = country_code.lower()
    
    df = data_loader.get_dataset(country_code)
    
    if df is None:
        raise HTTPException(
            status_code=404,
            detail=f"No data available for country '{country_code}'"
        )
    
    # Group by program
    program_stats = df.groupby("program").agg({
        "univName": "count",
        "cgpa": "mean",
        "admit": "mean"
    }).reset_index()
    
    program_stats.columns = ["program", "record_count", "avg_cgpa", "admit_rate"]
    program_stats = program_stats.sort_values("record_count", ascending=False).head(limit)
    
    programs = []
    for _, row in program_stats.iterrows():
        programs.append({
            "name": row["program"],
            "record_count": int(row["record_count"]),
            "avg_cgpa": round(row["avg_cgpa"], 2) if row["avg_cgpa"] else None,
            "admit_rate": round(row["admit_rate"] * 100, 1) if row["admit_rate"] else None
        })
    
    return {
        "country": country_code,
        "programs": programs
    }
