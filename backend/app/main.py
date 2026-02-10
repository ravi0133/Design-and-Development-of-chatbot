"""
UniRoute Backend - Main FastAPI Application
Overseas Education Consultancy API with RAG-powered Chatbot
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.routes import chat, universities, countries
from app.services.rag_pipeline import RAGPipeline

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global RAG pipeline instance
rag_pipeline = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events
    """
    global rag_pipeline
    
    # Startup
    logger.info("🚀 Starting UniRoute Backend...")
    logger.info(f"📂 Data directory: {settings.DATA_DIR}")
    logger.info(f"📂 Vector store directory: {settings.VECTORSTORE_DIR}")
    
    try:
        # Initialize RAG Pipeline
        logger.info("🔧 Initializing RAG Pipeline...")
        rag_pipeline = RAGPipeline()
        await rag_pipeline.initialize()
        logger.info("✅ RAG Pipeline initialized successfully!")
        
        # Store in app state for access in routes
        app.state.rag_pipeline = rag_pipeline
        
    except Exception as e:
        logger.error(f"❌ Failed to initialize RAG Pipeline: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("👋 Shutting down UniRoute Backend...")


# Create FastAPI app
app = FastAPI(
    title="UniRoute API",
    description="Backend API for UniRoute - Overseas Education Consultancy with RAG-powered Chatbot",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(universities.router, prefix="/api", tags=["Universities"])
app.include_router(countries.router, prefix="/api", tags=["Countries"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to UniRoute API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "rag_initialized": rag_pipeline is not None and rag_pipeline.is_initialized
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
