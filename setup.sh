#!/bin/bash

# ============================================================
# UniRoute Project Setup Script
# Complete folder and file structure for the web application
# ============================================================

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║          🎓 UniRoute Project Setup Script              ║"
echo "║      Overseas Education Consultancy Web App            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# ================================================
# CREATE ROOT DIRECTORY
# ================================================
echo "📁 Creating root directory..."
mkdir -p uniroute
cd uniroute || exit

# ================================================
# FRONTEND STRUCTURE (React + Vite)
# ================================================
echo "📁 Creating frontend structure..."

# Main frontend directories
mkdir -p frontend/public
mkdir -p frontend/src/assets/images
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/hooks
mkdir -p frontend/src/utils
mkdir -p frontend/src/styles

# Frontend config files
touch frontend/index.html
touch frontend/package.json
touch frontend/vite.config.js
touch frontend/.env

# Frontend entry points
touch frontend/src/main.jsx
touch frontend/src/App.jsx
touch frontend/src/api.js

# Layout Components
touch frontend/src/components/Navbar.jsx
touch frontend/src/components/Footer.jsx
touch frontend/src/components/HeroSection.jsx
touch frontend/src/components/LoadingSpinner.jsx

# Card Components
touch frontend/src/components/CountryCard.jsx
touch frontend/src/components/ServiceCard.jsx
touch frontend/src/components/UniversityCard.jsx
touch frontend/src/components/TestimonialCard.jsx
touch frontend/src/components/StatCard.jsx

# Chat Components
touch frontend/src/components/ChatWidget.jsx
touch frontend/src/components/ChatMessage.jsx
touch frontend/src/components/ChatInput.jsx

# Page Components
touch frontend/src/pages/Home.jsx
touch frontend/src/pages/StudyAbroad.jsx
touch frontend/src/pages/CountryDetail.jsx
touch frontend/src/pages/Services.jsx
touch frontend/src/pages/About.jsx
touch frontend/src/pages/Help.jsx

# Custom Hooks
touch frontend/src/hooks/useChat.js

# Utilities
touch frontend/src/utils/constants.js

# Stylesheets
touch frontend/src/styles/main.css
touch frontend/src/styles/variables.css
touch frontend/src/styles/components.css
touch frontend/src/styles/pages.css

echo "   ✅ Frontend structure created"

# ================================================
# BACKEND STRUCTURE (FastAPI + Python)
# ================================================
echo "📁 Creating backend structure..."

# Main backend directories
mkdir -p backend/app/routes
mkdir -p backend/app/services
mkdir -p backend/app/models
mkdir -p backend/app/utils
mkdir -p backend/data
mkdir -p backend/vectorstore/usa
mkdir -p backend/vectorstore/uk
mkdir -p backend/vectorstore/india
mkdir -p backend/vectorstore/germany
mkdir -p backend/vectorstore/australia
mkdir -p backend/vectorstore/combined

# Python __init__.py files (CRITICAL for imports!)
touch backend/app/__init__.py
touch backend/app/routes/__init__.py
touch backend/app/services/__init__.py
touch backend/app/models/__init__.py
touch backend/app/utils/__init__.py

# Main application files
touch backend/app/main.py
touch backend/app/config.py

# API Routes
touch backend/app/routes/chat.py
touch backend/app/routes/universities.py
touch backend/app/routes/countries.py

# Services (RAG Pipeline)
touch backend/app/services/data_loader.py
touch backend/app/services/embeddings.py
touch backend/app/services/vector_store.py
touch backend/app/services/rag_pipeline.py
touch backend/app/services/response_generator.py

# Data Models
touch backend/app/models/schemas.py

# Utilities
touch backend/app/utils/helpers.py
touch backend/app/utils/document_templates.py

# Config files
touch backend/requirements.txt
touch backend/.env
touch backend/.env.example

# Data directory placeholder
touch backend/data/.gitkeep

echo "   ✅ Backend structure created"

# ================================================
# ROOT FILES
# ================================================
echo "📁 Creating root configuration files..."

touch README.md
touch .gitignore
touch start_backend.sh
touch start_frontend.sh
touch docker-compose.yml

echo "   ✅ Root files created"

# ================================================
# MAKE SCRIPTS EXECUTABLE
# ================================================
chmod +x start_backend.sh
chmod +x start_frontend.sh

# ================================================
# CREATE .gitignore CONTENT
# ================================================
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.py[cod]
*$py.class
.Python
env/
venv/
.venv/

# Environment files
.env
.env.local
*.local

# Build outputs
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Vector store indices (regenerated)
backend/vectorstore/*/index.faiss
backend/vectorstore/*/index.pkl

# Test coverage
.coverage
htmlcov/
EOF

echo "   ✅ .gitignore configured"

# ================================================
# PRINT SUCCESS MESSAGE
# ================================================
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║         ✅ UniRoute Setup Complete!                    ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📂 Project Structure:"
echo ""
echo "uniroute/"
echo "├── frontend/                    # React + Vite Application"
echo "│   ├── index.html"
echo "│   ├── package.json"
echo "│   ├── vite.config.js"
echo "│   ├── .env"
echo "│   └── src/"
echo "│       ├── main.jsx             # Entry point"
echo "│       ├── App.jsx              # Root component + routing"
echo "│       ├── api.js               # API client"
echo "│       ├── components/"
echo "│       │   ├── Navbar.jsx"
echo "│       │   ├── Footer.jsx"
echo "│       │   ├── HeroSection.jsx"
echo "│       │   ├── CountryCard.jsx"
echo "│       │   ├── ServiceCard.jsx"
echo "│       │   ├── ChatWidget.jsx"
echo "│       │   ├── ChatMessage.jsx"
echo "│       │   └── ChatInput.jsx"
echo "│       ├── pages/"
echo "│       │   ├── Home.jsx"
echo "│       │   ├── StudyAbroad.jsx"
echo "│       │   ├── CountryDetail.jsx"
echo "│       │   ├── Services.jsx"
echo "│       │   ├── About.jsx"
echo "│       │   └── Help.jsx"
echo "│       ├── hooks/"
echo "│       │   └── useChat.js"
echo "│       ├── utils/"
echo "│       │   └── constants.js"
echo "│       └── styles/"
echo "│           ├── main.css"
echo "│           ├── variables.css"
echo "│           ├── components.css"
echo "│           └── pages.css"
echo "│"
echo "├── backend/                     # FastAPI + Python Application"
echo "│   ├── app/"
echo "│   │   ├── __init__.py"
echo "│   │   ├── main.py              # FastAPI entry point"
echo "│   │   ├── config.py            # Settings & configuration"
echo "│   │   ├── routes/"
echo "│   │   │   ├── __init__.py"
echo "│   │   │   ├── chat.py          # Chat/RAG endpoints"
echo "│   │   │   ├── universities.py  # University data endpoints"
echo "│   │   │   └── countries.py     # Country info endpoints"
echo "│   │   ├── services/"
echo "│   │   │   ├── __init__.py"
echo "│   │   │   ├── data_loader.py   # Load & process CSVs"
echo "│   │   │   ├── embeddings.py    # HuggingFace embeddings"
echo "│   │   │   ├── vector_store.py  # FAISS operations"
echo "│   │   │   ├── rag_pipeline.py  # RAG orchestration"
echo "│   │   │   └── response_generator.py"
echo "│   │   ├── models/"
echo "│   │   │   ├── __init__.py"
echo "│   │   │   └── schemas.py       # Pydantic models"
echo "│   │   └── utils/"
echo "│   │       ├── __init__.py"
echo "│   │       ├── helpers.py"
echo "│   │       └── document_templates.py"
echo "│   ├── data/                    # CSV datasets go here"
echo "│   │   ├── usa.csv"
echo "│   │   ├── uk.csv"
echo "│   │   ├── india.csv"
echo "│   │   ├── germany.csv"
echo "│   │   ├── australia.csv"
echo "│   │   └── combined.csv"
echo "│   ├── vectorstore/             # FAISS indices (per country)"
echo "│   │   ├── usa/"
echo "│   │   ├── uk/"
echo "│   │   ├── india/"
echo "│   │   ├── germany/"
echo "│   │   ├── australia/"
echo "│   │   └── combined/"
echo "│   ├── requirements.txt"
echo "│   ├── .env"
echo "│   └── .env.example"
echo "│"
echo "├── start_backend.sh             # Backend startup script"
echo "├── start_frontend.sh            # Frontend startup script"
echo "├── docker-compose.yml           # Docker configuration"
echo "├── .gitignore"
echo "└── README.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1️⃣  Copy your datasets to backend/data/"
echo "    cp usa_cleaned.csv uniroute/backend/data/usa.csv"
echo "    cp uk_cleaned.csv uniroute/backend/data/uk.csv"
echo "    cp india_cleaned.csv uniroute/backend/data/india.csv"
echo "    cp germany_cleaned.csv uniroute/backend/data/germany.csv"
echo "    cp australia_cleaned.csv uniroute/backend/data/australia.csv"
echo "    cp combined_all_countries.csv uniroute/backend/data/combined.csv"
echo ""
echo "2️⃣  Set up environment variables"
echo "    Edit backend/.env and frontend/.env"
echo ""
echo "3️⃣  Install dependencies"
echo "    cd frontend && npm install"
echo "    cd backend && pip install -r requirements.txt"
echo ""
echo "4️⃣  Run the application"
echo "    ./start_backend.sh"
echo "    ./start_frontend.sh"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎓 UniRoute - Empowering Nepalese Students to Study Abroad"
echo ""
