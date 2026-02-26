"use client"

import { useState } from 'react'
import { Plus, Edit2, Trash2, FileText } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { getDocumentTypes } from '@/utils/queries/document/query'
import { createDocumentType, deleteDocumentType } from '@/utils/queries/document/document_type'
import { DocumentType } from '@/types/document'
import DocumentTypeEditor from './editor'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer'

function DocumentTypeParent() {
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [modeSelectedType, setModeSelectedType] = useState<'create' | 'edit'>('create')
    const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null)
    const queryClient = useQueryClient()

    const { data: documentTypes, isLoading } = useQuery({
        queryKey: ['document-types'],
        queryFn: getDocumentTypes
    })

    const createMutation = useMutation({
        mutationFn: createDocumentType,
        onSuccess: () => {
            toast.success('Document type created successfully')
            queryClient.invalidateQueries({ queryKey: ['document-types'] })
        },
        onError: (error: any) => {
            toast.error('Failed to create document type')
            console.error(error)
        }
    })

    const openEditor = (mode: 'create' | 'edit', documentType?: DocumentType) => {
        setModeSelectedType(mode)
        setSelectedDocType(documentType || null)
        setIsEditorOpen(true)
    }

    const cancelEditor = () => {
        setIsEditorOpen(false)
        setModeSelectedType('create')
        setSelectedDocType(null)
    }

    const handleBackdropClick = () => {
        cancelEditor()
    }

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
                        onClick={() => openEditor('create')}
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Document Type
                    </Button>
                </div>
            </header><div className="flex-1 overflow-auto p-8">
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
                                                    onClick={() => openEditor('edit', type)}
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
                                    onClick={() => openEditor('create')}
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

            {isEditorOpen && (
                <Drawer open={isEditorOpen} onOpenChange={setIsEditorOpen} direction="right">
                    <DrawerContent className="!w-1/2 !max-w-none h-full rounded-none border-l bg-white data-[vaul-drawer-direction=right]:!w-1/2 data-[vaul-drawer-direction=right]:!max-w-none">
                        <DrawerHeader className="border-b">
                            <DrawerTitle>
                                {modeSelectedType === 'create' ? 'Create Document Type' : 'Edit Document Type'}
                            </DrawerTitle>
                            <DrawerDescription>
                                {modeSelectedType === 'create' ? 'Define classification and risk parameters' : 'Update document type settings'}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex-1 overflow-auto">
                            <DocumentTypeEditor
                                onCancel={cancelEditor}
                                mode={modeSelectedType}
                                documentType={selectedDocType}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    )
}

export default DocumentTypeParent