"""
UniRoute - Data Loader Service
Loads and processes CSV datasets for RAG pipeline
"""

import pandas as pd
import logging
from pathlib import Path
from typing import Dict, List, Optional
from app.config import settings

logger = logging.getLogger(__name__)


class DataLoader:
    """
    Handles loading and processing of university datasets
    """
    
    def __init__(self):
        self.datasets: Dict[str, pd.DataFrame] = {}
        self.is_loaded = False
    
    def load_all_datasets(self) -> Dict[str, pd.DataFrame]:
        """
        Load all country datasets and the combined dataset
        Returns dictionary of DataFrames keyed by country code
        """
        logger.info("Loading datasets...")
        
        for country, path in settings.dataset_paths.items():
            try:
                if path.exists():
                    df = pd.read_csv(path)
                    self.datasets[country] = df
                    logger.info(f"✅ Loaded {country}: {len(df)} records")
                else:
                    logger.warning(f"⚠️ Dataset not found: {path}")
            except Exception as e:
                logger.error(f"❌ Error loading {country}: {e}")
        
        self.is_loaded = True
        return self.datasets
    
    def get_dataset(self, country: str) -> Optional[pd.DataFrame]:
        """Get dataset for a specific country"""
        return self.datasets.get(country)
    
    def get_combined_dataset(self) -> Optional[pd.DataFrame]:
        """Get the combined dataset"""
        return self.datasets.get("combined")
    
    def create_documents_for_rag(self, country: Optional[str] = None) -> List[dict]:
        """
        Convert dataset rows to documents for RAG indexing
        Each document contains information about a student admission case
        
        Args:
            country: Optional country filter. If None, uses combined dataset.
        
        Returns:
            List of document dictionaries with 'content' and 'metadata'
        """
        if country and country != "combined":
            df = self.get_dataset(country)
            source = country
        else:
            df = self.get_combined_dataset()
            source = "combined"
        
        if df is None:
            logger.warning(f"No dataset found for {source}")
            return []
        
        documents = []
        
        for idx, row in df.iterrows():
            # Create a rich text representation of the admission case
            content = self._create_document_content(row)
            
            # Create metadata for filtering
            metadata = {
                "country": str(row.get("destination_country", "Unknown")),
                "university": str(row.get("univName", "Unknown")),
                "program": str(row.get("program", "Unknown")),
                "major": str(row.get("major", "Unknown")),
                "department": str(row.get("department", "Unknown")),
                "term": str(row.get("termAndYear", "Unknown")),
                "admitted": bool(row.get("admit", 0)),
                "source": source,
                "row_index": idx
            }
            
            documents.append({
                "content": content,
                "metadata": metadata
            })
        
        logger.info(f"Created {len(documents)} documents from {source} dataset")
        return documents
    
    def _create_document_content(self, row: pd.Series) -> str:
        """
        Create a natural language representation of an admission case
        This text will be embedded for semantic search
        """
        parts = []
        
        # Basic info
        country = row.get("destination_country", "Unknown")
        university = row.get("univName", "Unknown")
        program = row.get("program", "Unknown")
        major = row.get("major", "Unknown")
        department = row.get("department", "")
        term = row.get("termAndYear", "Unknown")
        admitted = "admitted" if row.get("admit", 0) == 1 else "not admitted"
        
        parts.append(f"Student application to {university} in {country} for {program} in {major}.")
        
        if department and department != "Not Specified":
            parts.append(f"Department: {department}.")
        
        parts.append(f"Term: {term}. Result: {admitted}.")
        
        # Academic scores
        cgpa = row.get("cgpa")
        cgpa_scale = row.get("cgpaScale", 10)
        if pd.notna(cgpa):
            parts.append(f"CGPA: {cgpa}/{cgpa_scale}.")
        
        # Test scores
        toefl = row.get("toeflScore")
        if pd.notna(toefl):
            parts.append(f"TOEFL Score: {toefl}.")
        
        gre_v = row.get("greV")
        gre_q = row.get("greQ")
        if pd.notna(gre_v) and pd.notna(gre_q):
            parts.append(f"GRE Verbal: {gre_v}, GRE Quant: {gre_q}.")
        
        gmat_v = row.get("gmatV")
        gmat_q = row.get("gmatQ")
        if pd.notna(gmat_v) and pd.notna(gmat_q):
            parts.append(f"GMAT Verbal: {gmat_v}, GMAT Quant: {gmat_q}.")
        
        # Experience
        research_exp = row.get("researchExp", 0)
        industry_exp = row.get("industryExp", 0)
        intern_exp = row.get("internExp", 0)
        
        if research_exp > 0:
            parts.append(f"Research experience: {research_exp} months.")
        if industry_exp > 0:
            parts.append(f"Industry experience: {industry_exp} months.")
        if intern_exp > 0:
            parts.append(f"Internship experience: {intern_exp} months.")
        
        # Publications
        journal_pubs = row.get("journalPubs", 0)
        conf_pubs = row.get("confPubs", 0)
        if journal_pubs > 0 or conf_pubs > 0:
            parts.append(f"Publications: {journal_pubs} journal, {conf_pubs} conference.")
        
        return " ".join(parts)
    
    def get_university_stats(self, country: Optional[str] = None) -> dict:
        """
        Get aggregated statistics about universities
        """
        if country:
            df = self.get_dataset(country)
        else:
            df = self.get_combined_dataset()
        
        if df is None:
            return {}
        
        stats = {
            "total_records": len(df),
            "universities": df["univName"].nunique(),
            "programs": df["program"].unique().tolist(),
            "majors": df["major"].unique().tolist()[:20],  # Top 20
            "avg_cgpa": df["cgpa"].mean() if "cgpa" in df else None,
            "admit_rate": df["admit"].mean() if "admit" in df else None,
            "top_universities": df["univName"].value_counts().head(10).index.tolist()
        }
        
        return stats


# Global data loader instance
data_loader = DataLoader()
