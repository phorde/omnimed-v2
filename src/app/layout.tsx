import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Calculator, Activity, Home } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OmniMed - Calculadoras Médicas',
  description: 'Ferramentas clínicas rápidas para IOT e DVA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900">OmniMed</span>
                </Link>
                
                <nav className="flex space-x-6">
                  <Link 
                    href="/iot" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>IOT</span>
                  </Link>
                  
                  <Link 
                    href="/dva" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    <span>DVA</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 text-sm">
            © 2025 OmniMed. Ferramentas para auxílio médico educacional.
          </div>
        </footer>
      </body>
    </html>
  )
}