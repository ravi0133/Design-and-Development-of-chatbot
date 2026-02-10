"""
UniRoute - Universities Routes
API endpoints for university data
"""

from fastapi import APIRouter, Query, HTTPException
import logging
from typing import Optional
from app.services.data_loader import data_loader

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/universities")
async def get_universities(
    country: Optional[str] = Query(None, description="Filter by country code"),
    program: Optional[str] = Query(None, description="Filter by program type"),
    limit: int = Query(20, ge=1, le=100, description="Number of results to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination")
):
    """
    Get list of universities from the dataset
    
    Args:
        country: Optional country filter (usa, uk, india, germany, australia)
        program: Optional program filter (MS, MBA, PhD, etc.)
        limit: Number of results
        offset: Pagination offset
        
    Returns:
        List of universities with statistics
    """
    try:
        # Get appropriate dataset
        if country and country.lower() != "all":
            df = data_loader.get_dataset(country.lower())
            if df is None:
                raise HTTPException(status_code=404, detail=f"Country '{country}' not found")
        else:
            df = data_loader.get_combined_dataset()
            if df is None:
                raise HTTPException(status_code=503, detail="Data not loaded")
        
        # Apply program filter if provided
        if program:
            df = df[df["program"].str.contains(program, case=False, na=False)]
        
        # Group by university and calculate stats
        university_stats = df.groupby("univName").agg({
            "destination_country": "first",
            "program": lambda x: list(x.unique())[:5],
            "cgpa": "mean",
            "admit": "mean",
            "greV": "mean",
            "greQ": "mean",
            "toeflScore": "mean"
        }).reset_index()
        
        # Rename columns
        university_stats.columns = [
            "name", "country", "programs", "avg_cgpa", 
            "admit_rate", "avg_gre_v", "avg_gre_q", "avg_toefl"
        ]
        
        # Sort by number of records (popularity)
        university_counts = df["univName"].value_counts()
        university_stats["record_count"] = university_stats["name"].map(university_counts)
        university_stats = university_stats.sort_values("record_count", ascending=False)
        
        # Apply pagination
        total = len(university_stats)
        universities = university_stats.iloc[offset:offset + limit].to_dict("records")
        
        # Clean up NaN values
        for univ in universities:
            for key, value in univ.items():
                if isinstance(value, float) and str(value) == 'nan':
                    univ[key] = None
                elif isinstance(value, float):
                    univ[key] = round(value, 2)
        
        return {
            "universities": universities,
            "total": total,
            "limit": limit,
            "offset": offset,
            "country_filter": country,
            "program_filter": program
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Universities endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/universities/search")
async def search_universities(
    q: str = Query(..., min_length=2, description="Search query"),
    country: Optional[str] = Query(None, description="Filter by country"),
    limit: int = Query(10, ge=1, le=50)
):
    """
    Search universities by name
    
    Args:
        q: Search query
        country: Optional country filter
        limit: Maximum results
        
    Returns:
        Matching universities
    """
    try:
        if country:
            df = data_loader.get_dataset(country.lower())
        else:
            df = data_loader.get_combined_dataset()
        
        if df is None:
            return {"universities": [], "query": q}
        
        # Search by university name
        matches = df[df["univName"].str.contains(q, case=False, na=False)]
        
        # Get unique universities with counts
        university_counts = matches["univName"].value_counts().head(limit)
        
        results = []
        for univ_name, count in university_counts.items():
            univ_data = matches[matches["univName"] == univ_name].iloc[0]
            results.append({
                "name": univ_name,
                "country": univ_data.get("destination_country", "Unknown"),
                "record_count": int(count),
                "sample_program": univ_data.get("program", "Various")
            })
        
        return {
            "universities": results,
            "query": q,
            "total_matches": len(results)
        }
        
    except Exception as e:
        logger.error(f"Search universities error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/universities/top")
async def get_top_universities(
    country: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=50)
):
    """
    Get top universities by admission records
    
    Args:
        country: Optional country filter
        limit: Number of results
        
    Returns:
        Top universities ranked by data availability
    """
    try:
        if country:
            df = data_loader.get_dataset(country.lower())
        else:
            df = data_loader.get_combined_dataset()
        
        if df is None:
            return {"universities": []}
        
        # Get top universities by record count
        top_unis = df["univName"].value_counts().head(limit)
        
        results = []
        for univ_name, count in top_unis.items():
            univ_records = df[df["univName"] == univ_name]
            results.append({
                "name": univ_name,
                "country": univ_records["destination_country"].iloc[0],
                "total_records": int(count),
                "admit_rate": round(univ_records["admit"].mean() * 100, 1) if "admit" in univ_records else None,
                "avg_cgpa": round(univ_records["cgpa"].mean(), 2) if "cgpa" in univ_records else None,
                "programs": list(univ_records["program"].unique())[:5]
            })
        
        return {
            "universities": results,
            "country_filter": country
        }
        
    except Exception as e:
        logger.error(f"Top universities error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
