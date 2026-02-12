'use client'

import { Gavel, Globe, Share2, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Gavel className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Legal<span className="text-primary">AI</span></span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              The world's most advanced AI platform for professional legal teams, ensuring compliance and reducing risk globally.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Contract Analysis</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Risk Detection</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Knowledge Base</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">API Integration</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Legal Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Whitepapers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Ethics & AI</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">© 2024 LegalAI Tech Corp. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Globe size={20} /></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Share2 size={20} /></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><MessageCircle size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
