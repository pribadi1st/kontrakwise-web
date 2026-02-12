export default function Stats() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="grid md:grid-cols-4 gap-12 text-center relative z-10">
            <div>
              <div className="text-5xl font-extrabold mb-2">95%</div>
              <div className="text-primary/10 text-xs font-bold uppercase tracking-widest text-blue-100">Review Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">10x</div>
              <div className="text-primary/10 text-xs font-bold uppercase tracking-widest text-blue-100">Faster Turnaround</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">$2M+</div>
              <div className="text-primary/10 text-xs font-bold uppercase tracking-widest text-blue-100">Saved in Liabilities</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">24/7</div>
              <div className="text-primary/10 text-xs font-bold uppercase tracking-widest text-blue-100">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
