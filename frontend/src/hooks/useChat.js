import { useState, useCallback } from 'react'
import { sendChatMessage } from '../api'

export function useChat(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (message, country = null) => {
    setIsLoading(true)
    setError(null)

    // Add user message
    const userMessage = { type: 'user', content: message, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await sendChatMessage(message, country)
      
      const botMessage = {
        type: 'bot',
        content: response.response,
        timestamp: new Date(),
        sources: response.sources || []
      }
      
      setMessages(prev => [...prev, botMessage])
      return botMessage
    } catch (err) {
      setError(err.message || 'Failed to send message')
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  }
}

export default useChat
