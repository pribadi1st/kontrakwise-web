import Header from '@/components/Home/Header'
import Hero from '@/components/Home/Hero'
import SocialProof from '@/components/Home/SocialProof'
import Features from '@/components/Home/Features'
import Stats from '@/components/Home/Stats'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Home/Footer'

export default function Home() {
  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      <Hero />
      <SocialProof />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}
