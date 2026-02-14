"use client"
import { useState } from 'react'
import {
    Search,
    Filter,
    CloudUpload
} from 'lucide-react'
import UploadModal from '@/components/UploadModal'
import { useQuery } from '@tanstack/react-query'
import { internalGetDocuments } from '@/utils/queries/document/query'
import { Document } from '@/types/document'
import { DocumentTable } from '@/components/Document/table'
import { getDocumentColumns } from '@/components/Document/columns'

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const { data: documents } = useQuery<Document[]>({
        queryKey: ['documents'],
        queryFn: () => internalGetDocuments(),
    })

    const columns = getDocumentColumns()

    return (
        <>
            <div className="flex flex-col h-full bg-gray-50">
                {/* Header */}
                <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex flex-col">
                        <h2 className="text-gray-900 text-2xl font-bold">My Documents</h2>
                        <p className="text-gray-500 text-sm">Manage and review your legal agreements</p>
                        {!!documents}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="Search your documents..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                        >
                            <CloudUpload size={18} />
                            Upload Contract
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 overflow-auto p-8">
                    <DocumentTable data={documents || []} columns={columns} />
                </div>
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </>
    )
}