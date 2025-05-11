import { ChatInterface } from '@/components/ChatInterface'
import { ScaleIcon, BookOpenIcon, UserCircleIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <ScaleIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-primary">Caral</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary flex items-center space-x-1">
                <BookOpenIcon className="h-5 w-5" />
                <span>Documentation</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary flex items-center space-x-1">
                <AcademicCapIcon className="h-5 w-5" />
                <span>Learn</span>
              </a>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center space-x-1">
                <UserCircleIcon className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome to CARAL</h1>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto">
            <p className="mb-2">
              We're here to help your business navigate data protection, data governance, and responsible data practices. You can ask us about:
            </p>
            <ul className="list-disc list-inside mb-2 text-left">
              <li>GDPR and data protection</li>
              <li>EU data governance</li>
              <li>Privacy compliance</li>
            </ul>
            <p>
              Ask your question — and get practical, privacy-focused answers built for your business.
            </p>
          </div>
        </header>
        
        <div className="max-w-5xl mx-auto">
          <ChatInterface />
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <BookOpenIcon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Comprehensive Coverage</h3>
            <p className="text-gray-600">Access information from official EU legal documents and regulations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <AcademicCapIcon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Analysis</h3>
            <p className="text-gray-600">Get AI-powered insights based on the latest EU legal frameworks.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ScaleIcon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Reliable Sources</h3>
            <p className="text-gray-600">All responses are based on official EUR-Lex documentation.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Caral</h4>
              <p className="text-sm text-gray-600">Your AI-powered assistant for understanding EU laws and regulations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">API Reference</a></li>
                <li><a href="#" className="hover:text-primary">Legal Sources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Support</a></li>
                <li><a href="#" className="hover:text-primary">Feedback</a></li>
                <li><a href="#" className="hover:text-primary">Partnership</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>© 2024 Caral. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 