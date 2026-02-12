'use client'

import { useState } from 'react'
import { Menu, X, Gavel } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Gavel className="text-white text-2xl" size={24} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Legal<span className="text-primary">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Solutions</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">About</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="secondary" >
                Login
              </Button>
            </Link>
            <Button variant="default" className='text-white'>
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-2 space-y-1">
            <a className="block px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Features</a>
            <a className="block px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Solutions</a>
            <a className="block px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Pricing</a>
            <a className="block px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary" href="#">About</a>
          </div>
        </div>
      )}
    </nav>
  )
}
