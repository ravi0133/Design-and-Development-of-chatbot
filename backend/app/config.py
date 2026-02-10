"""
UniRoute Backend Configuration
Loads settings from environment variables
"""

import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    DATA_DIR: Path = Path(__file__).resolve().parent.parent / "data"
    VECTORSTORE_DIR: Path = Path(__file__).resolve().parent.parent / "vectorstore"
    
    # Embedding Model
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    
    # RAG Settings
    CHUNK_SIZE: int = 500
    CHUNK_OVERLAP: int = 50
    TOP_K_RESULTS: int = 5
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    # Dataset file paths
    @property
    def dataset_paths(self) -> dict:
        return {
            "usa": self.DATA_DIR / "usa.csv",
            "uk": self.DATA_DIR / "uk.csv",
            "india": self.DATA_DIR / "india.csv",
            "germany": self.DATA_DIR / "germany.csv",
            "australia": self.DATA_DIR / "australia.csv",
            "combined": self.DATA_DIR / "combined.csv"
        }
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()
