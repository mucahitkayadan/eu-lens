'use client'

import { useState } from 'react'
import { PaperAirplaneIcon, ArrowPathIcon, BookmarkIcon, ShareIcon, DocumentTextIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'

interface Source {
  name: string
  url: string
  relevance: number
  text?: string
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
  const [selectedSource, setSelectedSource] = useState<Source | null>(null)

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

  const handleSourceClick = (e: React.MouseEvent, source: Source) => {
    e.preventDefault()
    setSelectedSource(source)
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
                      ? 'bg-primary text-white prose-p:text-white prose-headings:text-white prose-strong:text-white prose-em:text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <div className={`text-sm prose prose-sm max-w-none ${message.role === 'user' ? 'text-white prose-headings:text-white prose-p:text-white prose-strong:text-white prose-em:text-white' : ''}`}>
                    {message.role === 'user' ? (
                      message.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          a: ({ href, children }) => (
                            <a href={href} className="text-primary hover:text-secondary underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto mb-2">
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-200 pl-4 italic mb-2">
                              {children}
                            </blockquote>
                          ),
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
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
                          <button
                            key={idx}
                            onClick={(e) => handleSourceClick(e, source)}
                            className="block text-xs text-primary hover:text-secondary text-left w-full"
                          >
                            {source.name} ({Math.round(source.relevance * 100)}% match)
                          </button>
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

      {/* Source Preview Popup */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-primary">{selectedSource.name}</h3>
              <div className="flex items-center space-x-2">
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-gray-600 mb-4">
                  Relevance: {Math.round(selectedSource.relevance * 100)}% match
                </p>
                {selectedSource.text ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedSource.text}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Source text not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 