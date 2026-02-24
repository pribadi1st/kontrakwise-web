export const logoutAPI = async () => {
    // Clear localStorage
    localStorage.removeItem('bearer_token')
    
    // Call server-side logout to clear cookie
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    if (!response.ok) {
        throw new Error('Failed to logout')
    }
    
    return response.json()
}
