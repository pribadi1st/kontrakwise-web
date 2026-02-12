'use client'

import { useState } from 'react'
import AuthLayout from './AuthLayout'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function LoginComponent() {
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log(isLogin ? 'Login submitted' : 'Register submitted')
    }

    return (
        <AuthLayout
            title={isLogin ? 'Welcome Back' : 'Get Started'}
            subtitle={isLogin ? 'Enter your credentials to access your workspace.' : 'Create your account to start analyzing contracts.'}
            showMobileLogo={true}
        >
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

            {/* Form */}
            {isLogin ? (
                <LoginForm onSubmit={handleSubmit} />
            ) : (
                <RegisterForm />
            )}
        </AuthLayout>
    )
}
