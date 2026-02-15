import { ArrowLeft, Download, FileText } from 'lucide-react'
import { Document } from '@/types/document'

interface DocumentDetailHeaderProps {
    document?: Document
    onBack?: () => void
    onDownload?: () => void
}

export default function DocumentDetailHeader({ document, onBack, onDownload }: DocumentDetailHeaderProps) {
    return (
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText size={20} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            {document?.filename || 'Document Detail'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Contract Analysis & Review
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={onDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    <Download size={18} />
                    Download
                </button>
            </div>
        </header>
    )
}
