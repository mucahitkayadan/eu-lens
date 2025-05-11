"use client";

import { ChatInterface } from '@/components/ChatInterface'
import { ScaleIcon, BookOpenIcon, UserCircleIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebaseClient';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle setting the user
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will handle setting the user to null
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading authentication state...</p>
      </div>
    );
  }

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
              {currentUser ? (
                <>
                  <span className="text-gray-700">Welcome, {currentUser.displayName || currentUser.email}</span>
                  <button 
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleSignIn}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center space-x-1"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">WELCOME TO CARAL!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant answers to your EU Privacy and Data Governance questions, powered by AI and backed by official sources and experts
          </p>
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
            <p className="text-gray-600">Work with your chosen advisor alongside AI for a comprehensive and efficient outcome.</p>
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
            <p>© 2025 Caral. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 