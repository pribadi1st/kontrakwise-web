"use client"

import { useState } from 'react'
import { Plus, Edit2, Trash2, FileText } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'

interface DocumentType {
    id: number
    name: string
}

// API functions
const getDocumentTypes = async (): Promise<DocumentType[]> => {
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

const createDocumentType = async (name: string): Promise<DocumentType> => {
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}document-types/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    })

    if (!response.ok) {
        throw new Error('Failed to create document type')
    }

    return response.json()
}

const deleteDocumentType = async (id: number): Promise<void> => {
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

export default function DocumentTypesPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newTypeName, setNewTypeName] = useState('')
    const [editingType, setEditingType] = useState<DocumentType | null>(null)

    const queryClient = useQueryClient()

    const { data: documentTypes, isLoading } = useQuery({
        queryKey: ['document-types'],
        queryFn: getDocumentTypes
    })

    const createMutation = useMutation({
        mutationFn: createDocumentType,
        onSuccess: () => {
            toast.success('Document type created successfully')
            setNewTypeName('')
            setIsAddModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['document-types'] })
        },
        onError: (error: any) => {
            toast.error('Failed to create document type')
            console.error(error)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteDocumentType,
        onSuccess: () => {
            toast.success('Document type deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['document-types'] })
        },
        onError: (error: any) => {
            toast.error('Failed to delete document type')
            console.error(error)
        }
    })

    const handleCreateType = () => {
        if (!newTypeName.trim()) return

        createMutation.mutate(newTypeName.trim())
    }

    const handleDeleteType = (id: number) => {
        if (confirm('Are you sure you want to delete this document type?')) {
            deleteMutation.mutate(id)
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                <div className="flex flex-col">
                    <h2 className="text-gray-900 text-2xl font-bold">Document Types</h2>
                    <p className="text-gray-500 text-sm">Manage document categories and types</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Document Type
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type Name
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {documentTypes?.map((type) => (
                                        <tr key={type.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FileText size={16} className="text-gray-400 mr-3" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {type.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => setEditingType(type)}
                                                    className="text-primary hover:text-primary-dark mr-3"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteType(type.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {(!documentTypes || documentTypes.length === 0) && (
                            <div className="text-center py-12">
                                <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No document types found</h3>
                                <p className="text-gray-500 mb-4">Get started by adding your first document type</p>
                                <Button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-primary hover:bg-primary-dark text-white"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Document Type
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Document Type</h3>

                        <Field>
                            <FieldLabel htmlFor="typeName">Type Name</FieldLabel>
                            <Input
                                id="typeName"
                                type="text"
                                value={newTypeName}
                                onChange={(e) => setNewTypeName(e.target.value)}
                                placeholder="e.g., Employment Contract, Lease Agreement"
                                className="bg-neutral-bg border-0 focus:bg-white focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </Field>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                onClick={() => {
                                    setIsAddModalOpen(false)
                                    setNewTypeName('')
                                }}
                                variant="outline"
                                className="border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateType}
                                disabled={!newTypeName.trim() || createMutation.isPending}
                                className="bg-primary hover:bg-primary-dark text-white"
                            >
                                {createMutation.isPending ? 'Creating...' : 'Create Type'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
