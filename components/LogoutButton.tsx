'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { logoutAPI } from '@/utils/queries/auth'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
    const router = useRouter()

    const { mutateAsync: logout, isPending } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            toast.success('Logged out successfully')
            router.refresh()
        },
        onError: (error: any) => {
            toast.error('Failed to logout')
            console.error('Logout error:', error)
        }
    })

    const handleLogout = async () => {
        await logout()
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="p-2 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <LogOut size={16} />
        </button>
    )
}
