'use client'

import { useState } from 'react'
import { PaperAirplaneIcon, ArrowPathIcon, BookmarkIcon, ShareIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'

interface Source {
  name: string
  url: string
  relevance: number
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
  sources?: Source[]
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        sources: data.sources
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">AI Assistant Online</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-primary">
            <BookmarkIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-primary">
            <ShareIcon className="h-5 w-5" />
          </button>
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={() => setMessages([])}
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50 bg-[url('/law-pattern.png')] bg-opacity-5">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm max-w-md">
              <h3 className="font-semibold text-primary mb-2">Welcome to EU-Lens!</h3>
              <p className="text-sm">
                I'm your AI legal assistant specialized in EU law. You can ask me about:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• GDPR and data protection</li>
                <li>• EU regulations and directives</li>
                <li>• Legal compliance requirements</li>
                <li>• Recent EU legal developments</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start max-w-[80%] space-x-2">
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    AI
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  {message.timestamp && (
                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-1 flex items-center">
                        <DocumentTextIcon className="h-3 w-3 mr-1" />
                        Sources:
                      </div>
                      <div className="space-y-1">
                        {message.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-primary hover:text-secondary"
                          >
                            {source.name} ({Math.round(source.relevance * 100)}% match)
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your legal question here..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 