import { API_BASE_URL } from "../base"

export const getDocuments = async (token: string) => {
    const response = await fetch(`${API_BASE_URL}documents`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const internalGetDocuments = async () => {
    const response = await fetch(`/api/documents`)
    const data = await response.json()
    return data
}