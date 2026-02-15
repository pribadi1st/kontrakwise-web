"use client"
import { Calendar, Tag, Shield, Clock } from 'lucide-react'
import { Document } from '@/types/document'

interface DocumentDetailMetadataProps {
    document?: Document
}

export default function DocumentDetailMetadata({ document }: DocumentDetailMetadataProps) {
    const getRiskLevelColor = (level?: string) => {
        switch (level) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200'
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'low': return 'text-green-600 bg-green-50 border-green-200'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'analyzed': return 'text-green-600 bg-green-50 border-green-200'
            case 'reviewing': return 'text-blue-600 bg-blue-50 border-blue-200'
            case 'draft': return 'text-gray-600 bg-gray-50 border-gray-200'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    return (
        <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                        {document?.created_at ? formatDate(document.created_at) : 'N/A'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                        {document?.type || 'PDF Document'}
                    </span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getRiskLevelColor(document?.riskLevel)}`}>
                    <Shield size={14} />
                    {document?.riskLevel || 'unknown'} risk
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(document?.status)}`}>
                    <Clock size={14} />
                    {document?.status || 'processing'}
                </div>
            </div>
        </div>
    )
}
