'use client'

import { CheckSquare, GitCompare, Brain, ArrowLeftRight } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-24 bg-surface dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Powerful Features</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Smarter legal workflows, built for humans.</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Our suite of AI-driven tools handles the tedious documentation so your team can focus on the law.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <CheckSquare size={28} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Instant Risk Assessment</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Automatically scan agreements for unusual clauses, missing protections, and high-liability terms.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded">HIGH RISK</span>
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded">SAFE</span>
              <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-1 rounded">AMBIGUOUS</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <GitCompare size={28} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Multi-Doc Comparison</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Compare thousands of versions instantly. Track redlines across different jurisdictions and counter-parties.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-1.5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
              <ArrowLeftRight className="text-primary" size={20} />
              <div className="flex-1 space-y-2">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-1.5 w-4/5 bg-primary/30 rounded"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Brain size={28} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Global Knowledge Chat</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Query your entire document repository with natural language. Get citations and page numbers instantly.</p>
            <div className="relative bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">AI</div>
                <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
                <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center">
                  <span className="text-[8px] text-slate-600">👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
