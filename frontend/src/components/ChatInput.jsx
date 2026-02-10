import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { COUNTRIES } from '../utils/constants'

function ChatInput({ onSend, disabled, selectedCountry, onCountryChange }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <select
          className="chat-country-select"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="">All Countries</option>
          {Object.values(COUNTRIES).map(country => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="chat-input"
          placeholder="Ask about universities, requirements, documents..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        <button 
          type="submit" 
          className="chat-send-btn"
          disabled={disabled || !message.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
