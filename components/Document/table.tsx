"use client"

import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table"
import { MoreHorizontal, FileText, File, CheckCircle, RefreshCw, Clock } from 'lucide-react'
import { Document } from "@/types/document"

interface DocumentTableProps {
    data: Document[],
    columns: ColumnDef<Document>[]
}

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

export function DocumentTable({ data, columns }: DocumentTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-6 py-4">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-bold text-gray-900">1-5</span> of <span className="font-bold text-gray-900">{data.length}</span> documents
                </p>
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 text-sm disabled:opacity-50"
                        disabled
                    >
                        Previous
                    </button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 text-sm">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}