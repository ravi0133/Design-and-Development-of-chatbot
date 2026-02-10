import React, { useState, useRef, useEffect } from 'react'
import { Bot } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { sendChatMessage } from '../api'

const INITIAL_MESSAGE = {
  type: 'bot',
  content: `Hello! 👋 I'm UniRoute's AI Advisor. I can help you with:

• University recommendations based on your profile
• Required documents for different countries
• Application requirements and deadlines
• Comparing universities across countries
• Test score requirements (GRE, GMAT, IELTS, TOEFL)

Select a country from the dropdown or ask me anything about studying abroad!`
}

function ChatWidget() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message) => {
    // Add user message to chat
    const userMessage = { type: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await sendChatMessage(message, selectedCountry || null)
      
      // Add bot response
      const botMessage = { 
        type: 'bot', 
        content: response.response || 'I apologize, but I encountered an issue processing your request. Please try again.'
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        type: 'bot',
        content: 'I apologize, but I\'m having trouble connecting to the server. Please make sure the backend is running and try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          <Bot size={20} />
        </div>
        <div className="chat-header-info">
          <h3>UniRoute AI Advisor</h3>
          <p>{isLoading ? 'Typing...' : 'Online • Ready to help'}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="chat-message bot">
            <div className="chat-message-avatar">
              <Bot size={16} />
            </div>
            <div className="chat-message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
    </div>
  )
}

export default ChatWidget
