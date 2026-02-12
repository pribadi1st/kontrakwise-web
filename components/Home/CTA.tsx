export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Ready to secure your contracts?</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">Join forward-thinking legal teams and experience the future of AI-driven legal intelligence.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl shadow-primary/30">
            Get Started Now
          </button>
          <button className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
