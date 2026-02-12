'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  showMobileLogo?: boolean
}

export default function AuthLayout({ children, title, subtitle, showMobileLogo = false }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden font-display">
      {/* Left Section - Hero (Desktop only) */}
      <div className="hidden md:flex w-[40%] bg-text-main relative flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Legal Abstract Background"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXhk7BuAan7XNPLUEjsQC4vzvDKQ3fLZjRJ6YhEvMv_HHHCdWYRPmsnzXNV1xx7keulY8QNFIMrBsGxqCZrL-OSvsKy89OlodROfQEqqfJx_Ii9YvuuBOwWgXczUDjUYFvuvlPTDfy1Vp0Dn0adNfeAQ0nCOWuw4sd8PtdnJ1lYvKtO-XamhfoKZ-ooVY84WXu15tfbaBShcW4GyWATXFYvUQr32l9nN7fobl-eYilD10J5UF1hNVrNFSD9U7X6iGnw1VZYhiTwSw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-text-main/80" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src={"/icon.png"} width={40} height={40} alt='Icon' />
            <h1 className="text-2xl font-bold tracking-tight">KontrakWise</h1>
          </Link>
        </div>

        <div className="relative z-10 mb-8">
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Analyze Contracts with <br />
            <span className="text-primary">Human Precision</span> and <br />
            <span className="text-primary">Machine Speed</span>.
          </h2>
          <p className="text-white/70 text-lg max-w-md font-light">
            Join over 5,000 legal professionals using our AI to reduce risk and accelerate document review cycles by 80%.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-text-main bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpfOTfXSFOQRVnFaY_Bf8ZBDF3Ge7xQ6GM_L-oNKPQMtrbjfdkCFUkHuKBr4hl82sr8T_GblK9xxxaaWZTfHzl494oqmpqZrHYhKIiCLP7euKzPUaOQ3d8p_zcT8mV8bcbZ3AcnlzPbOJe11p18H-4orAuTpjOz0qZQiearrtGZec4KPBTxm4qTPEDDZSEOOXrlUO4tBuh6KJTR30UFeL547qg8Lm-9l154hPb3_vXkqHA4XTFzlLgpu4ZWacfvHNcGatmRvhRKZQ')" }} />
              <div className="w-10 h-10 rounded-full border-2 border-text-main bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjJOw60Jwiqi_WF7dIxt8XO3oTEDNaWP4LWYXobRgidj6-VdS3fXG4s2kMbMRPOTWQ_06rpozsakJxuCZDioGTvtUhDrIzohtQU4raJdrNB_xcx_CcPtHfPiH-1EZ32_n2aO2FJxbhDclT7pSaPhg6otunKBygY17tjtfDKm6rpNNBp_WTDWErs4yEJ7eT6i04516EV3PA6_Fb6q51U4mCIVZ_SneAl-G31PWXhALZO_UpTZI9s7KkUbSjU7O3KaM8ygLSv_xXQZU')" }} />
              <div className="w-10 h-10 rounded-full border-2 border-text-main bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBT4-aPvsRXfl9_49wSvFw5dBwChDFvy0Symmsexj7rPEpuV7EAVcmewACo-Qk-gdv2Xaw0XjEpBhB46ii7cMq0mHNYlU_-n4e_uWiY78qqs8VKUqBgigwI3_xTI0LhtNDMcQIsgaj6VPWyesUmjxwfhon5WqMFTg76pErdJ1aG1PVdUp6n0AmlbJUitJEPVPLXJ14dXnxQUYaJ_q-U9uq9Dt0ejkiSlnhEaFMKfVPIPWWt5V709z8O3KjA_dTFU1_y2gcy1uDV2qo')" }} />
            </div>
            <div className="text-sm text-white/70">
              <span className="font-bold text-white">5.0/5</span> from leading firms
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/40 flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span>© {new Date().getFullYear()} KontrakWise</span>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="w-full md:w-[60%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          {showMobileLogo && (
            <div className="md:hidden flex items-center gap-2 mb-8 justify-center text-text-main">
              <div className="bg-primary p-1.5 rounded-lg">
                <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-2xl font-bold">KontrakWise</span>
            </div>
          )}

          <div className="text-center md:text-left mb-6">
            <h2 className="text-3xl font-bold text-text-main mb-2">{title}</h2>
            <p className="text-slate-text">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
