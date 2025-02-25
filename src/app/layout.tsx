import type { Metadata } from 'next'
import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'EU-Lens - Legal Assistant',
  description: 'Your AI-powered assistant for EU legal questions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 