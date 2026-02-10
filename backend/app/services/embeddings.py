"""
UniRoute - Embeddings Service
Handles text embedding using HuggingFace models
"""

import logging
from typing import List
from sentence_transformers import SentenceTransformer
from app.config import settings

logger = logging.getLogger(__name__)


class EmbeddingService:
    """
    Handles text embedding using Sentence Transformers
    Uses the all-MiniLM-L6-v2 model for efficient semantic embeddings
    """
    
    def __init__(self, model_name: str = None):
        """
        Initialize the embedding model
        
        Args:
            model_name: HuggingFace model name. Defaults to config setting.
        """
        self.model_name = model_name or settings.EMBEDDING_MODEL
        self.model = None
        self.dimension = None
    
    def load_model(self):
        """Load the embedding model"""
        logger.info(f"Loading embedding model: {self.model_name}")
        
        try:
            self.model = SentenceTransformer(self.model_name)
            # Get embedding dimension
            self.dimension = self.model.get_sentence_embedding_dimension()
            logger.info(f"✅ Model loaded. Embedding dimension: {self.dimension}")
        except Exception as e:
            logger.error(f"❌ Failed to load embedding model: {e}")
            raise
    
    def embed_text(self, text: str) -> List[float]:
        """
        Generate embedding for a single text
        
        Args:
            text: Input text to embed
            
        Returns:
            List of floats representing the embedding vector
        """
        if self.model is None:
            self.load_model()
        
        embedding = self.model.encode(text, convert_to_tensor=False)
        return embedding.tolist()
    
    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
        """
        if self.model is None:
            self.load_model()
        
        embeddings = self.model.encode(texts, convert_to_tensor=False, show_progress_bar=True)
        return embeddings.tolist()
    
    def get_dimension(self) -> int:
        """Get the embedding dimension"""
        if self.dimension is None:
            self.load_model()
        return self.dimension


# Global embedding service instance
embedding_service = EmbeddingService()
