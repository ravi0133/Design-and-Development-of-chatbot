const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Chat API - Send message to RAG chatbot
export async function sendChatMessage(message, country = null) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        country: country
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to get response from chatbot')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Chat API Error:', error)
    throw error
  }
}

// Get list of universities by country
export async function getUniversities(country = null, limit = 20) {
  try {
    const params = new URLSearchParams()
    if (country) params.append('country', country)
    if (limit) params.append('limit', limit)
    
    const response = await fetch(`${API_URL}/api/universities?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch universities')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Universities API Error:', error)
    throw error
  }
}

// Get country statistics
export async function getCountryStats(country) {
  try {
    const response = await fetch(`${API_URL}/api/countries/${country}/stats`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch country stats')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Country Stats API Error:', error)
    throw error
  }
}

// Get all countries info
export async function getCountries() {
  try {
    const response = await fetch(`${API_URL}/api/countries`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Countries API Error:', error)
    throw error
  }
}

// Health check
export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`)
    return await response.json()
  } catch (error) {
    console.error('Health Check Error:', error)
    return { status: 'error', message: 'Backend not available' }
  }
}
