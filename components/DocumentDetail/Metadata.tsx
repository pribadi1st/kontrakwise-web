"use client"
import { Calendar, Clock, FileText, Shield, Tag } from 'lucide-react'
import { Document } from '@/types/document'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

    const getToolTipStyle = (level?: string) => {
        switch (level) {
            case 'high': return 'border-danger-border bg-danger-surface [&_svg]:bg-danger-surface [&_svg]:fill-danger-surface [&_svg]:border-r [&_svg]:border-b [&_svg]:border-danger-border'
            case 'medium': return 'border-warning-border bg-warning-surface [&_svg]:bg-warning-border [&_svg]:fill-warning-surface [&_svg]:border-r [&_svg]:border-b [&_svg]:border-warning-border'
            case 'low': return 'border-success-border bg-success-surface [&_svg]:bg-success-border [&_svg]:fill-success-surface [&_svg]:border-r [&_svg]:border-b [&_svg]:border-success-border'
            default: return 'border-gray-200'
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'pending': return 'text-green-600 bg-green-50 border-green-200'
            case 'extracted': return 'text-blue-600 bg-blue-50 border-blue-200'
            case 'summarized': return 'text-primary bg-primary-surface border-primary-border'
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
        <TooltipProvider>
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
                    {document?.risk_reasoning ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getRiskLevelColor(document?.risk_level)} cursor-help`}>
                                    <Shield size={14} />
                                    {document?.risk_level || 'unknown'} risk
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className={`bg-white border ${getToolTipStyle(document.risk_level)}`}>
                                <p className="max-w-xs">{document.risk_reasoning}</p>
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getRiskLevelColor(document?.risk_level)}`}>
                            <Shield size={14} />
                            {document?.risk_level || 'unknown'} risk
                        </div>
                    )}
                    {document?.ai_progress && (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(document?.ai_progress)}`}>
                            <Clock size={14} />
                            {document?.ai_progress}
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    )
}
