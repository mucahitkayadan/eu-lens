import { ChatInterface } from '@/components/ChatInterface'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">EU-Lens</h1>
        <p className="text-lg text-gray-600">Your AI-powered assistant for EU legal questions</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  )
} 