'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Key, Gavel } from 'lucide-react'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)

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
                    {/* <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20"> */}
                    <Image src={"/icon.png"} width={40} height={40} alt='Icon'></Image>
                    {/* </div> */}
                    <h1 className="text-2xl font-bold tracking-tight">KontrakWise</h1>
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

            {/* Right Section - Login Form */}
            <div className="w-full md:w-[60%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center gap-2 mb-8 justify-center text-text-main">
                        <Gavel className="text-primary w-8 h-8" />
                        <span className="text-2xl font-bold">KontrakWise</span>
                    </div>

                    {/* Toggle Switch */}
                    <div className="bg-neutral-bg p-1 rounded-lg flex mb-8">
                        <button
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all text-center ${isLogin ? 'bg-white text-text-main shadow-sm' : 'text-slate-500 hover:text-text-main'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 py-2.5 text-sm font-medium transition-all text-center ${!isLogin ? 'bg-white text-text-main shadow-sm' : 'text-slate-500 hover:text-text-main'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="text-center md:text-left mb-6">
                        <h2 className="text-3xl font-bold text-text-main mb-2">{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
                        <p className="text-slate-text">{isLogin ? 'Enter your credentials to access your workspace.' : 'Create your account to start analyzing contracts.'}</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                className="bg-neutral-bg border-0 focus:bg-white focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                                {isLogin && <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">Forgot Password?</a>}
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-neutral-bg border-0 focus:bg-white focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6">
                            {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-4 text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Button variant="outline" className="w-full gap-3 py-6 border-gray-200 text-gray-900 hover:bg-gray-50">
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M12.0003 20.45c4.656 0 8.5283-3.1593 9.9488-7.5348H12.0003v-3.834h11.2307c.1052.6833.1604 1.3934.1604 2.1166 0 6.627-5.373 12-12 12-6.627 0-12-5.373-12-12s5.373-12 12-12c3.0526 0 5.8363 1.1578 7.9702 3.0527l-3.0886 3.0575c-1.1274-1.025-2.735-1.7402-4.8816-1.7402-4.116 0-7.4532 3.3373-7.4532 7.4533s3.3372 7.453 7.4532 7.453z" fill="#4285F4" stroke="none"></path>
                            </svg>
                            <span className="text-sm font-semibold">Google</span>
                        </Button>
                        <Button variant="outline" className="w-full gap-3 py-6 border-gray-200 text-gray-900 hover:bg-gray-50">
                            <Key className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-semibold">SSO</span>
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Need help?
                        <a href="#" className="font-semibold text-primary hover:text-primary/80 ml-1">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
