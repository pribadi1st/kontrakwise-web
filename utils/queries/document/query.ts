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

export const getDocumentFile = async (token: string, document_id: string) => {
    const response = await fetch(`${API_BASE_URL}documents/${document_id}/file`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const downloadDocumentFile = async (token: string, document_id: string) => {
    return await fetch(`${API_BASE_URL}documents/${document_id}/download`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const internalGetDocumentsDetail = async (document_id: string) => {
    console.log('Fetching document:', document_id)
    const response = await fetch(`/api/documents/${document_id}/file`)

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        throw new Error(errorData.error || 'Failed to fetch document file')
    }

    const data = await response.blob()
    console.log('Raw blob details:', {
        size: data.size,
        type: data.type,
        isBlob: data instanceof Blob,
        constructor: data.constructor.name
    })

    return data
}