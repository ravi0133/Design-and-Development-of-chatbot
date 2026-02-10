"""
UniRoute - Vector Store Service
Manages FAISS vector database for semantic search
"""

import faiss
import numpy as np
import pickle
import logging
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from app.config import settings
from app.services.embeddings import embedding_service

logger = logging.getLogger(__name__)


class VectorStore:
    """
    FAISS-based vector store for semantic search
    Supports multiple indices for different countries
    """
    
    def __init__(self):
        self.indices: Dict[str, faiss.Index] = {}
        self.documents: Dict[str, List[dict]] = {}
        self.is_initialized = False
    
    def create_index(self, name: str, documents: List[dict]) -> bool:
        """
        Create a FAISS index from documents
        
        Args:
            name: Index name (e.g., 'usa', 'uk', 'combined')
            documents: List of dicts with 'content' and 'metadata'
            
        Returns:
            True if successful
        """
        if not documents:
            logger.warning(f"No documents to index for {name}")
            return False
        
        logger.info(f"Creating index '{name}' with {len(documents)} documents...")
        
        try:
            # Extract texts for embedding
            texts = [doc["content"] for doc in documents]
            
            # Generate embeddings
            logger.info(f"Generating embeddings for {len(texts)} documents...")
            embeddings = embedding_service.embed_texts(texts)
            embeddings_array = np.array(embeddings).astype('float32')
            
            # Create FAISS index
            dimension = embeddings_array.shape[1]
            index = faiss.IndexFlatL2(dimension)  # L2 distance (Euclidean)
            
            # Add vectors to index
            index.add(embeddings_array)
            
            # Store index and documents
            self.indices[name] = index
            self.documents[name] = documents
            
            logger.info(f"✅ Index '{name}' created with {index.ntotal} vectors")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to create index '{name}': {e}")
            return False
    
    def search(
        self, 
        query: str, 
        index_name: str = "combined",
        top_k: int = None,
        filter_metadata: Optional[dict] = None
    ) -> List[Tuple[dict, float]]:
        """
        Search for similar documents
        
        Args:
            query: Search query
            index_name: Which index to search
            top_k: Number of results to return
            filter_metadata: Optional metadata filters
            
        Returns:
            List of (document, distance) tuples
        """
        top_k = top_k or settings.TOP_K_RESULTS
        
        if index_name not in self.indices:
            logger.warning(f"Index '{index_name}' not found")
            return []
        
        try:
            # Generate query embedding
            query_embedding = embedding_service.embed_text(query)
            query_array = np.array([query_embedding]).astype('float32')
            
            # Search index
            index = self.indices[index_name]
            documents = self.documents[index_name]
            
            # Get more results if we need to filter
            search_k = top_k * 3 if filter_metadata else top_k
            
            distances, indices = index.search(query_array, min(search_k, len(documents)))
            
            # Collect results
            results = []
            for dist, idx in zip(distances[0], indices[0]):
                if idx < 0 or idx >= len(documents):
                    continue
                
                doc = documents[idx]
                
                # Apply metadata filter if specified
                if filter_metadata:
                    match = all(
                        doc.get("metadata", {}).get(k) == v 
                        for k, v in filter_metadata.items()
                    )
                    if not match:
                        continue
                
                results.append((doc, float(dist)))
                
                if len(results) >= top_k:
                    break
            
            return results
            
        except Exception as e:
            logger.error(f"❌ Search failed: {e}")
            return []
    
    def save_index(self, name: str) -> bool:
        """Save an index to disk"""
        if name not in self.indices:
            logger.warning(f"Index '{name}' not found")
            return False
        
        try:
            index_dir = settings.VECTORSTORE_DIR / name
            index_dir.mkdir(parents=True, exist_ok=True)
            
            # Save FAISS index
            index_path = index_dir / "index.faiss"
            faiss.write_index(self.indices[name], str(index_path))
            
            # Save documents (metadata)
            docs_path = index_dir / "documents.pkl"
            with open(docs_path, 'wb') as f:
                pickle.dump(self.documents[name], f)
            
            logger.info(f"✅ Index '{name}' saved to {index_dir}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to save index '{name}': {e}")
            return False
    
    def load_index(self, name: str) -> bool:
        """Load an index from disk"""
        index_dir = settings.VECTORSTORE_DIR / name
        index_path = index_dir / "index.faiss"
        docs_path = index_dir / "documents.pkl"
        
        if not index_path.exists() or not docs_path.exists():
            logger.info(f"Index '{name}' not found on disk")
            return False
        
        try:
            # Load FAISS index
            self.indices[name] = faiss.read_index(str(index_path))
            
            # Load documents
            with open(docs_path, 'rb') as f:
                self.documents[name] = pickle.load(f)
            
            logger.info(f"✅ Index '{name}' loaded from disk ({self.indices[name].ntotal} vectors)")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to load index '{name}': {e}")
            return False
    
    def get_index_stats(self, name: str) -> dict:
        """Get statistics for an index"""
        if name not in self.indices:
            return {"error": f"Index '{name}' not found"}
        
        return {
            "name": name,
            "total_vectors": self.indices[name].ntotal,
            "total_documents": len(self.documents.get(name, [])),
            "dimension": self.indices[name].d
        }


# Global vector store instance
vector_store = VectorStore()
