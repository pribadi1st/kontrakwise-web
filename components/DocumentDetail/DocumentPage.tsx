"use client"
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Document } from '@/types/document'
import {
    DocumentDetailHeader,
    DocumentDetailMetadata,
    DocumentDetailContent,
    Chat
} from '@/components/DocumentDetail'
import { useQuery } from '@tanstack/react-query'
import { internalGetDocumentsDetail } from '@/utils/queries/document/query'
import { useStreamingChat } from '@/hooks/useStreamingChat'

interface DocumentDetailClientProps {
    document: Document
}

export default function DocumentDetailClient({ document }: DocumentDetailClientProps) {
    const router = useRouter()
    const { data: pdfBlob, isLoading, error } = useQuery({
        queryKey: ['document-file', document.id],
        queryFn: () => internalGetDocumentsDetail(document.id.toString())
    })

    // Debug logging
    useEffect(() => {
        console.log('PDF Query State:', {
            isLoading,
            error,
            data: pdfBlob ? `Blob received (${pdfBlob.size} bytes)` : 'No blob',
            documentId: document.id
        })
    }, [isLoading, error, pdfBlob, document.id])

    const [inputMessage, setInputMessage] = useState('')
    const [isChatExpanded, setIsChatExpanded] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Use streaming chat hook
    const { messages, isStreaming, sendMessage, deleteDocument } = useStreamingChat(document.id)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        await sendMessage(inputMessage)
        setInputMessage('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
            setInputMessage('')
        }
    }

    const handleQuickAction = (action: string) => {
        const actionMessages: Record<string, string> = {
            'summarize': 'Please provide a summary of this contract.',
            'risks': 'What are the main risks in this contract?',
            'key-terms': 'What are the key terms and definitions in this contract?',
            'obligations': 'What are the main obligations for each party?'
        }

        const message = actionMessages[action]
        if (message) {
            setInputMessage(message)
            handleSendMessage()
        }
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                <DocumentDetailHeader
                    document={document}
                    onBack={handleBack}
                />
                <DocumentDetailMetadata document={document} />
                <DocumentDetailContent pdfBlob={pdfBlob} isLoading={isLoading} error={error || undefined} />
            </div>

            {/* Chat Sidebar */}
            <Chat
                messages={messages}
                inputMessage={inputMessage}
                isTyping={isStreaming}
                isChatExpanded={isChatExpanded}
                onSendMessage={handleSendMessage}
                onInputChange={setInputMessage}
                onKeyPress={handleKeyPress}
                onToggleExpanded={() => setIsChatExpanded(!isChatExpanded)}
                onQuickAction={handleQuickAction}
            />
        </div>
    )
}
