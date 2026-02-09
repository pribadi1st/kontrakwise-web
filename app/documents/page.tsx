"use client"
import { useState } from 'react'
import {
    Search,
    Filter,
    CloudUpload,
    MoreHorizontal,
    FileText,
    File,
    CheckCircle,
    RefreshCw,
    Clock
} from 'lucide-react'
import UploadModal from '@/components/UploadModal'

interface Document {
    id: string
    name: string
    size: string
    uploadDate: string
    type: string
    riskLevel: 'high' | 'medium' | 'low'
    status: 'analyzed' | 'reviewing' | 'draft'
    fileType: 'pdf' | 'docx'
}

const mockDocuments: Document[] = [
    {
        id: '1',
        name: 'Master_Service_Agreement_Q3.pdf',
        size: '14.2 MB',
        uploadDate: 'Oct 24, 2023',
        type: 'MSA',
        riskLevel: 'high',
        status: 'analyzed',
        fileType: 'pdf'
    },
    {
        id: '2',
        name: 'NDA_Wayne_Enterprises.docx',
        size: '2.4 MB',
        uploadDate: 'Oct 22, 2023',
        type: 'NDA',
        riskLevel: 'low',
        status: 'reviewing',
        fileType: 'docx'
    },
    {
        id: '3',
        name: 'Vendor_Contract_v4.pdf',
        size: '8.1 MB',
        uploadDate: 'Oct 20, 2023',
        type: 'Vendor',
        riskLevel: 'medium',
        status: 'analyzed',
        fileType: 'pdf'
    },
    {
        id: '4',
        name: 'Employment_Agreement_Template.docx',
        size: '1.8 MB',
        uploadDate: 'Oct 18, 2023',
        type: 'HR',
        riskLevel: 'low',
        status: 'draft',
        fileType: 'docx'
    },
    {
        id: '5',
        name: 'SaaS_Licensing_Global.pdf',
        size: '5.5 MB',
        uploadDate: 'Oct 15, 2023',
        type: 'SaaS',
        riskLevel: 'high',
        status: 'analyzed',
        fileType: 'pdf'
    }
]

function getRiskColor(riskLevel: string) {
    switch (riskLevel) {
        case 'high':
            return 'bg-red-50 text-red-700 border-red-100'
        case 'medium':
            return 'bg-orange-50 text-orange-700 border-orange-100'
        case 'low':
            return 'bg-green-50 text-green-700 border-green-100'
        default:
            return 'bg-gray-50 text-gray-700 border-gray-100'
    }
}

function getRiskDotColor(riskLevel: string) {
    switch (riskLevel) {
        case 'high':
            return 'bg-red-500'
        case 'medium':
            return 'bg-orange-500'
        case 'low':
            return 'bg-green-500'
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

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col h-full bg-gray-50">
                {/* Header */}
                <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex flex-col">
                        <h2 className="text-gray-900 text-2xl font-bold">My Documents</h2>
                        <p className="text-gray-500 text-sm">Manage and review your legal agreements</p>
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 w-[35%]">Document Name</th>
                                    <th className="px-6 py-4">Date Uploaded</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Risk Level</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {mockDocuments.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded ${doc.riskLevel === 'high' ? 'bg-red-50' : 'bg-blue-100'}`}>
                                                    {getFileIcon(doc.fileType, doc.riskLevel)}
                                                </div>
                                                <div>
                                                    <p className="text-gray-900 text-sm font-bold group-hover:text-primary transition-colors cursor-pointer">
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-0.5">{doc.size}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getTypeColor(doc.type)}`}>
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(doc.riskLevel)}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${getRiskDotColor(doc.riskLevel)}`}></span>
                                                {doc.riskLevel.charAt(0).toUpperCase() + doc.riskLevel.slice(1)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                                {getStatusIcon(doc.status)}
                                                <span className={doc.status === 'analyzed' ? 'text-primary' : 'text-gray-500'}>
                                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-bold text-gray-900">1-5</span> of <span className="font-bold text-gray-900">48</span> documents
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