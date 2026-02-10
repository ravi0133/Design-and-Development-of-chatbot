"""
UniRoute - RAG Pipeline Service
Orchestrates the complete RAG (Retrieval Augmented Generation) workflow
"""

import logging
from typing import Optional, List, Dict
from app.config import settings
from app.services.data_loader import data_loader
from app.services.embeddings import embedding_service
from app.services.vector_store import vector_store
from app.services.response_generator import response_generator

logger = logging.getLogger(__name__)


class RAGPipeline:
    """
    Main RAG Pipeline that orchestrates:
    1. Data loading
    2. Embedding generation
    3. Vector store indexing
    4. Query processing
    5. Response generation
    """
    
    def __init__(self):
        self.is_initialized = False
        self.available_indices = []
    
    async def initialize(self) -> bool:
        """
        Initialize the complete RAG pipeline
        - Load datasets
        - Initialize embedding model
        - Create or load vector indices
        """
        logger.info("🚀 Initializing RAG Pipeline...")
        
        try:
            # Step 1: Load embedding model
            logger.info("Step 1: Loading embedding model...")
            embedding_service.load_model()
            
            # Step 2: Load datasets
            logger.info("Step 2: Loading datasets...")
            data_loader.load_all_datasets()
            
            # Step 3: Create/Load vector indices for each country
            logger.info("Step 3: Setting up vector indices...")
            await self._setup_indices()
            
            self.is_initialized = True
            logger.info("✅ RAG Pipeline initialized successfully!")
            return True
            
        except Exception as e:
            logger.error(f"❌ RAG Pipeline initialization failed: {e}")
            raise
    
    async def _setup_indices(self):
        """
        Set up vector indices for each country and combined dataset
        Tries to load from disk first, creates new if not found
        """
        countries = ["usa", "uk", "india", "germany", "australia", "combined"]
        
        for country in countries:
            # Try loading from disk first
            if vector_store.load_index(country):
                self.available_indices.append(country)
                continue
            
            # Create new index
            logger.info(f"Creating new index for {country}...")
            documents = data_loader.create_documents_for_rag(country)
            
            if documents:
                success = vector_store.create_index(country, documents)
                if success:
                    # Save to disk for future use
                    vector_store.save_index(country)
                    self.available_indices.append(country)
        
        logger.info(f"Available indices: {self.available_indices}")
    
    async def query(
        self,
        question: str,
        country: Optional[str] = None,
        top_k: int = None
    ) -> Dict:
        """
        Process a user query through the RAG pipeline
        
        Args:
            question: User's question
            country: Optional country filter
            top_k: Number of results to retrieve
            
        Returns:
            Dict with 'response', 'sources', and metadata
        """
        if not self.is_initialized:
            return {
                "response": "The system is still initializing. Please try again in a moment.",
                "sources": [],
                "error": "not_initialized"
            }
        
        top_k = top_k or settings.TOP_K_RESULTS
        
        try:
            # Determine which index to search
            index_name = country if country and country in self.available_indices else "combined"
            
            logger.info(f"Processing query: '{question[:50]}...' using index: {index_name}")
            
            # Search vector store
            search_results = vector_store.search(
                query=question,
                index_name=index_name,
                top_k=top_k
            )
            
            # Generate response
            response_text = response_generator.generate_response(
                query=question,
                search_results=search_results,
                country=country
            )
            
            # Extract sources for transparency
            sources = []
            for doc, score in search_results[:3]:
                metadata = doc.get("metadata", {})
                sources.append({
                    "university": metadata.get("university", "Unknown"),
                    "country": metadata.get("country", "Unknown"),
                    "program": metadata.get("program", "Unknown"),
                    "relevance_score": round(1 / (1 + score), 3)  # Convert distance to similarity
                })
            
            return {
                "response": response_text,
                "sources": sources,
                "index_used": index_name,
                "results_count": len(search_results)
            }
            
        except Exception as e:
            logger.error(f"Query processing error: {e}")
            return {
                "response": "I encountered an error processing your question. Please try again.",
                "sources": [],
                "error": str(e)
            }
    
    def get_status(self) -> Dict:
        """Get pipeline status information"""
        return {
            "initialized": self.is_initialized,
            "available_indices": self.available_indices,
            "embedding_model": settings.EMBEDDING_MODEL,
            "index_stats": {
                name: vector_store.get_index_stats(name)
                for name in self.available_indices
            }
        }
