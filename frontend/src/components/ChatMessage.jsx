import React from 'react'
import { Bot, User } from 'lucide-react'

function ChatMessage({ message }) {
  const { type, content, timestamp } = message
  const isBot = type === 'bot'

  return (
    <div className={`chat-message ${type}`}>
      <div className="chat-message-avatar">
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className="chat-message-content">
        {/* Render content with line breaks and formatting */}
        {content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ChatMessage
