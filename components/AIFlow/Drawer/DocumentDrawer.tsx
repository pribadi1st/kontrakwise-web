"use client"

import { useState, useEffect } from 'react'
import { Document } from '@/types/document'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer'
import { FileText, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { internalGetDocuments } from '@/utils/queries/document/query'

interface DocumentDrawerProps {
    isOpen: boolean
    onClose: () => void
    selectedDocumentId: number | null
    onDocumentSelect: (document: Document) => void
    nodeId?: string
}

export function DocumentDrawer({ isOpen, onClose, onDocumentSelect, selectedDocumentId }: DocumentDrawerProps) {
    const { data: documents, isLoading } = useQuery<Document[]>({
        queryKey: ['documents'],
        queryFn: () => internalGetDocuments(),
        enabled: !!isOpen,
        staleTime: 60 * 60 * 1000, // 1 hour
    })

    const handleDocumentSelect = (document: Document) => {
        onDocumentSelect(document)
        onClose()
    }

    const getRiskLevelColor = (level?: string) => {
        switch (level) {
            case 'high':
                return 'text-red-600 bg-red-50 border-red-200'
            case 'medium':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'low':
                return 'text-green-600 bg-green-50 border-green-200'
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'analyzed':
                return 'text-blue-600 bg-blue-50'
            case 'reviewing':
                return 'text-orange-600 bg-orange-50'
            case 'draft':
                return 'text-gray-600 bg-gray-50'
            default:
                return 'text-gray-600 bg-gray-50'
        }
    }

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="h-full w-96 max-w-none rounded-none bg-white">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Select Document
                    </DrawerTitle>
                    <DrawerDescription>
                        Choose a document to use in your workflow
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 px-4 pb-4 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : documents?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <FileText className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-600">No documents available</p>
                            <p className="text-sm text-gray-500 mt-2">Upload documents to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {documents?.map((document) => (
                                <div
                                    key={document.id}
                                    className={cn(
                                        "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                                        selectedDocumentId === document.id
                                            ? "border-primary bg-primary/5"
                                            : "border-gray-200 hover:border-gray-300"
                                    )}
                                    onClick={() => handleDocumentSelect(document)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <h3 className="font-medium text-sm truncate">
                                                    {document.filename}
                                                </h3>
                                                {selectedDocumentId === document.id && (
                                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                                )}
                                            </div>

                                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                                {document.summary || 'No summary available'}
                                            </p>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    {document.document_type.name}
                                                </span>

                                                {document.risk_level && (
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded-full border",
                                                        getRiskLevelColor(document.risk_level)
                                                    )}>
                                                        {document.risk_level} risk
                                                    </span>
                                                )}

                                                {document.status && (
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded-full",
                                                        getStatusColor(document.status)
                                                    )}>
                                                        {document.status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {document.risk_reasoning && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-600">
                                                <span className="font-medium">Risk Note:</span> {document.risk_reasoning}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    )
}
