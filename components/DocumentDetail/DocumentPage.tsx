"use client"
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Document } from '@/types/document'
import { Message } from '@/components/DocumentDetail/Chat/types'
import {
    DocumentDetailHeader,
    DocumentDetailMetadata,
    DocumentDetailContent,
    Chat
} from '@/components/DocumentDetail'
import { useQuery } from '@tanstack/react-query'
import { internalGetDocumentsDetail } from '@/utils/queries/document/query'

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
    }, [isLoading, error, pdfBlob])
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m your contract analysis assistant. I can help you understand this document, answer questions about specific clauses, identify potential risks, and explain legal terminology. What would you like to know?',
            sender: 'bot',
            timestamp: new Date().toISOString()
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isChatExpanded, setIsChatExpanded] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setIsTyping(true)

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'I\'m analyzing your question about the document. Based on the contract terms I can see, this appears to be a standard agreement with typical clauses around liability, termination, and payment terms. Would you like me to highlight any specific areas of concern?',
                sender: 'bot',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
        }, 1500)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleQuickAction = (action: string) => {
        const actionMessages = {
            'summarize': 'Please provide a summary of this contract.',
            'risks': 'What are the main risks in this contract?',
            'key-terms': 'What are the key terms and definitions in this contract?',
            'obligations': 'What are the main obligations for each party?'
        }

        setInputMessage(actionMessages[action] || '')
        handleSendMessage()
    }

    const handleBack = () => {
        router.push('/documents')
    }

    const handleDownload = () => {
        // Implement download functionality
        console.log('Download document:', document.id)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                <DocumentDetailHeader
                    document={document}
                    onBack={handleBack}
                    onDownload={handleDownload}
                />
                <DocumentDetailMetadata document={document} />
                <DocumentDetailContent pdfBlob={pdfBlob} isLoading={isLoading} error={error} />
            </div>

            {/* Chat Sidebar */}
            <Chat
                messages={messages}
                inputMessage={inputMessage}
                isTyping={isTyping}
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
