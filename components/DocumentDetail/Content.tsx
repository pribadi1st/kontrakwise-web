"use client"
import { useState, useEffect, useMemo } from 'react'
import {
    PdfLoader,
    PdfHighlighter,
    Highlight,
    AreaHighlight,
    IHighlight
} from 'react-pdf-highlighter'
import 'react-pdf-highlighter/dist/style.css'

interface DocumentDetailContentProps {
    pdfBlob?: Blob
    isLoading?: boolean,
    error?: Error
}

export default function DocumentDetailContent({ pdfBlob, isLoading, error }: DocumentDetailContentProps) {
    const [highlights, setHighlights] = useState<Array<IHighlight>>([])

    const pdfUrl = useMemo(() => {
        if (!pdfBlob) return ''
        return URL.createObjectURL(pdfBlob)
    }, [pdfBlob])

    // 1. Fix: Correctly map the library's position object to your state
    const addHighlight = (highlight: any) => {
        setHighlights(prev => [{ ...highlight, id: Math.random().toString(36).slice(2) }, ...prev])
    }

    if (error) return <div>Error: {error.message}</div>
    if (isLoading) return <div className="p-10 text-center">Loading PDF...</div>

    return (
        <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-full">
                <div className="max-w-4xl mx-auto">
                    {/* Document Header with Title and Download */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Document Preview</h2>
                        <a href={pdfUrl} download="document.pdf" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                            Download PDF
                        </a>
                    </div>

                    {/* PDF Viewer Container */}
                    <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50" style={{ height: '75vh' }}>
                        {pdfUrl && (
                            <PdfLoader url={pdfUrl} beforeLoad={<p>Loading PDF...</p>}>
                                {(pdfDocument) => (
                                    <PdfHighlighter
                                        pdfDocument={pdfDocument}
                                        enableAreaSelection={(event) => event.altKey}
                                        onScrollChange={() => { }}
                                        onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => {
                                            addHighlight({ position, content });
                                            hideTipAndSelection();
                                        }}
                                        highlights={highlights}
                                        renderHighlight={(highlight, index, resetSelection, screenshot, isScrolledTo) => {
                                            const component = highlight.content.image ? (
                                                <AreaHighlight isScrolledTo={isScrolledTo} highlight={highlight} onChange={() => { }} />
                                            ) : (
                                                <Highlight isScrolledTo={isScrolledTo} position={highlight.position} comment={highlight.comment} />
                                            );
                                            return component;
                                        }}
                                    />
                                )}
                            </PdfLoader>
                        )}
                    </div>

                    {/* AI Analysis Section */}
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>AI Analysis:</strong> This document is ready for contract analysis. Use chat assistant to ask questions about specific clauses, risks, or terms. The AI can help you understand legal terminology and identify potential issues.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}