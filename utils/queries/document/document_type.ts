import { FormDocumentType } from "@/types/document"
import { id } from "zod/locales"

export const getDocumentTypes = async (): Promise<DocumentType[]> => {
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}document-types/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch document types')
    }

    return response.json()
}

export const createDocumentType = async (form: FormDocumentType): Promise<DocumentType> => {
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}document-types/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
    })

    if (!response.ok) {
        throw new Error('Failed to create document type')
    }

    return response.json()
}

export const updateDocumentType = async (data: Partial<FormDocumentType>): Promise<DocumentType> => {
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}document-types/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Failed to update document type')
    }

    return response.json()
}

export const deleteDocumentType = async (id: number): Promise<void> => {
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}document-types/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete document type')
    }
}