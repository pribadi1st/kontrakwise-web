'use client'

import { ArrowRight, Info, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-wide uppercase">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Trusted by 500+ Legal Firms
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6">
              Contract Analysis, <br />
              <span className="text-primary">Redefined by AI</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Empower your legal team with instant risk detection and automated document comparison. Save hours of manual review and focus on high-value strategy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={20} />
              </button>
              <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                Book a Demo
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" alt="User profile avatar 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQMGyBcXH5HW0ytEhLYqrU0ynMHUu8In6fUhLddS-6DriSgOnAdOAo06cWbzts3oyYcdndbqIRkWX0tL6gDe_xxcQ7FgfUYMqTPT4OWVXYb0n-PNIzdn7JXdG7wAxdzL_7maaYl-et2cl9Wl8B-VOjfqU9AdUg0_NNhihtbmdT1AEynqt-yW4DN1fh7ly8-zig0iwczLOziHJQt5OfqBv-RzRJO1kyzZi6XOxidi1bjhldVMtFfdcr0q21fyVoYkNuucLWNy4PU0E" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" alt="User profile avatar 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe4WBMcDmFOZcIaXC5zPvlxQhUBSoc_UbY8yGuea9ogPEMGdusR1Y7-YzKlkgzTU1BaNfKvUnqR02hKTrmfKq5Ibj_z8UW1s3gsOSpbnsEcSRF2JZvon8XLVF5SiF2EYVH11pAC4GL2QWxmV6smor7BUgzpK7mtmfvRx7eNHaBsLCVtoXtuVIqB82FTghtnbw3wYeXjnk3t2AUGC_ghBo_xGGPX_r8k-Rc7IX9F_bemiqGgrnHxTW1wcdVWX1lsxrL_0kHKxy-GVo" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" alt="User profile avatar 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1spXByQsrOtQoe0q3WtBC3fZIuJONGt2Y2U1oD51AXg8m91VDEj08qs_aDEZ3hJc9TTZ7ZUqgRkdgTsXcSH_BWXAlSMvzlndJJuIWik6PQmR2ciqZNlU9hLpQ9DSFP59CDAfQP01DHTLSfiJmTWeAZC8ixOMBXb48upqyjhGBF9vrSrGwHJQLBmoVkcC0_xteMLoU_96AUJz2iV-4NEnYzaNs-RVaYu3apFLwgX2__EIkkNEuRypSSaPysH3XL3wkyOq71jCt5ag" />
              </div>
              <p className="text-sm font-medium">Join <span className="text-slate-900 dark:text-white font-bold">12,000+</span> legal professionals</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 transform scale-95 opacity-50"></div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-xs font-bold text-slate-400 tracking-wider">LEGAL-DASHBOARD-V2</div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded"></div>
                      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded"></div>
                      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded w-5/6"></div>
                      <div className="h-24 bg-primary/5 border-l-4 border-primary rounded-r p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="text-primary" size={14} />
                          <span className="text-xs font-bold text-primary">AI ANALYSIS</span>
                        </div>
                        <div className="h-2 w-full bg-primary/20 rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-primary/20 rounded"></div>
                      </div>
                      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded"></div>
                      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded w-4/6"></div>
                    </div>
                  </div>

                  <div className="col-span-4 border-l border-slate-100 dark:border-slate-700 pl-6">
                    <div className="text-[10px] font-bold text-slate-400 mb-4 tracking-widest uppercase">Risk Score</div>
                    <div className="text-3xl font-extrabold text-amber-500 mb-6 tracking-tight">72<span className="text-sm font-normal text-slate-400">/100</span></div>
                    <div className="space-y-4">
                      <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded flex items-center justify-between border border-emerald-100 dark:border-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">COMPLIANT</span>
                        <CheckCircle className="text-emerald-500" size={12} />
                      </div>
                      <div className="bg-red-50 dark:bg-red-500/10 p-2 rounded flex items-center justify-between border border-red-100 dark:border-red-500/20">
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400">LIABILITY RISK</span>
                        <AlertTriangle className="text-red-500" size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
