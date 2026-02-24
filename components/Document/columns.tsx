"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Document } from "@/types/document"
import { FileText, File, CheckCircle, RefreshCw, Clock, Eye, Trash2 } from 'lucide-react'
import { DateConverter } from "@/utils/converter"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Link from "next/link"
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function getRiskColor(riskLevel: string) {
    switch (riskLevel) {
        case 'high':
            return 'bg-danger-surface text-danger border-danger'
        case 'medium':
            return 'bg-warning-surface text-warning border-warning'
        case 'low':
            return 'bg-success-surface text-success border-success'
        default:
            return 'bg-gray-50 text-gray-700 border-gray-100'
    }
}

function getRiskDotColor(riskLevel: string) {
    switch (riskLevel) {
        case 'high':
            return 'bg-danger'
        case 'medium':
            return 'bg-warning'
        case 'low':
            return 'bg-success'
        default:
            return 'bg-gray-500'
    }
}

function getTypeColor(type: string) {
    switch (type) {
        case 'MSA':
        case 'SaaS':
            return 'bg-purple-50 text-purple-700 border-purple-100'
        case 'NDA':
            return 'bg-blue-50 text-blue-700 border-blue-100'
        case 'Vendor':
            return 'bg-orange-50 text-orange-700 border-orange-100'
        case 'HR':
            return 'bg-green-50 text-green-700 border-green-100'
        default:
            return 'bg-gray-50 text-gray-700 border-gray-100'
    }
}

function getFileIcon(fileType: string, riskLevel: string) {
    const iconClass = riskLevel === 'high' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-100'

    if (fileType === 'pdf') {
        return <FileText size={20} className={iconClass} />
    }
    return <File size={20} className={iconClass} />
}

function getStatusIcon(status: string) {
    switch (status) {
        case 'analyzed':
            return <CheckCircle size={16} className="text-primary" />
        case 'reviewing':
            return <RefreshCw size={16} className="animate-spin text-gray-500" />
        case 'draft':
            return <Clock size={16} className="text-gray-500" />
        default:
            return null
    }
}

export function getDocumentColumns(): ColumnDef<Document>[] {
    const deleteMutation = useMutation({
        mutationFn: async (documentId: number) => {
            const token = localStorage.getItem('bearer_token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}documents/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to delete document')
            }

            return response.json()
        },
        onSuccess: () => {
            toast.success('Document deleted successfully')
            // Refresh the documents list
            window.location.reload()
        },
        onError: (error: any) => {
            toast.error('Failed to delete document')
            console.error('Delete error:', error)
        }
    })

    return [
        {
            id: "filename",
            accessorKey: "name",
            header: "Document Name",
            cell: ({ row }) => {
                const doc = row.original
                return (
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${doc.riskLevel === 'high' ? 'bg-red-50' : 'bg-blue-100'}`}>
                            {getFileIcon(doc.type || '', doc.riskLevel || '')}
                        </div>
                        <div>
                            <Link href={`/documents/${doc.id}`}>
                                <p className="text-gray-900 text-sm font-bold group-hover:text-primary transition-colors cursor-pointer">
                                    {doc.filename}
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "created_at",
            accessorKey: "created_at",
            header: "Date Uploaded",
            cell: ({ row }) => {
                const { created_at } = row.original
                return <span className="text-sm text-gray-600">{DateConverter(created_at)}</span>
            }
        },
        {
            id: "actions",
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const doc = row.original
                return (
                    <div className="text-right flex gap-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={`/documents/${doc.id}`}>
                                    <Eye size={20} className="text-primary" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className='bg-primary [&_svg]:bg-primary [&_svg]:fill-primary text-white'>
                                <p>View Document</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => deleteMutation.mutate(doc.id)}
                                    disabled={deleteMutation.isPending}
                                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className='bg-danger [&_svg]:bg-danger [&_svg]:fill-danger text-white'>
                                <p>{deleteMutation.isPending ? 'Deleting...' : 'Delete Document'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
}