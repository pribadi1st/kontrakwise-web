"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Document } from "@/types/document"
import { MoreHorizontal, FileText, File, CheckCircle, RefreshCw, Clock, Eye, Trash2 } from 'lucide-react'
import { DateConverter } from "@/utils/converter"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
                            <p className="text-gray-900 text-sm font-bold group-hover:text-primary transition-colors cursor-pointer">
                                {doc.filename}
                            </p>
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
        // {
        //     id: "type",
        //     accessorKey: "type",
        //     header: "Type",
        //     cell: ({ row }) => {
        //         const { type } = row.original
        //         return (
        //             <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getTypeColor(type)}`}>
        //                 {type}
        //             </span>
        //         )
        //     }
        // },
        // {
        //     id: "riskLevel",
        //     accessorKey: "riskLevel",
        //     header: "Risk Level",
        //     cell: ({ row }) => {
        //         const { riskLevel } = row.original
        //         return (
        //             <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(riskLevel)}`}>
        //                 <span className={`w-1.5 h-1.5 rounded-full ${getRiskDotColor(riskLevel)}`}></span>
        //                 {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
        //             </div>
        //         )
        //     }
        // },
        // {
        //     id: "status",
        //     accessorKey: "status",
        //     header: "Status",
        //     cell: ({ row }) => {
        //         const { status } = row.original
        //         return (
        //             <div className="flex items-center gap-1.5 text-sm font-medium">
        //                 {getStatusIcon(status)}
        //                 <span className={status === 'analyzed' ? 'text-primary' : 'text-gray-500'}>
        //                     {status.charAt(0).toUpperCase() + status.slice(1)}
        //                 </span>
        //             </div>
        //         )
        //     }
        // },
        {
            id: "actions",
            accessorKey: "actions",
            header: "Actions",
            cell: () => {
                return (
                    <div className="text-right flex gap-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <Eye size={20} className="text-primary" />
                            </TooltipTrigger>
                            <TooltipContent className='bg-primary [&_svg]:bg-primary [&_svg]:fill-primary text-white'>
                                <p>View Document</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Trash2 size={20} className="text-danger" />
                            </TooltipTrigger>
                            <TooltipContent className='bg-danger [&_svg]:bg-danger [&_svg]:fill-danger text-white'>
                                <p>Delete Document</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
}