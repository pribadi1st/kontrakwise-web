import { useState, useCallback } from 'react'
import { Message } from '@/components/DocumentDetail/Chat/types'
import { sendStreamingChatMessage, StreamingEvent } from '@/utils/queries/chat'

export function useStreamingChat(documentId: number) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m your contract analysis assistant. I can help you understand this document, answer questions about specific clauses, identify potential risks, and explain legal terminology. What would you like to know?',
            sender: 'bot',
            timestamp: new Date().toISOString()
        }
    ])
    const [isStreaming, setIsStreaming] = useState(false)

    const sendMessage = useCallback(async (query: string) => {
        if (!query.trim() || isStreaming) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: query,
            sender: 'user',
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, userMessage])

        // Create initial bot message for streaming
        const botMessageId = (Date.now() + 1).toString()
        const botMessage: Message = {
            id: botMessageId,
            text: '',
            sender: 'bot',
            timestamp: new Date().toISOString(),
            isStreaming: true
        }

        setMessages(prev => [...prev, botMessage])
        setIsStreaming(true)

        try {
            const stream = sendStreamingChatMessage({
                query,
                document_id: documentId
            })

            for await (const event of stream) {
                switch (event.type) {
                    case 'start':
                        console.log('Streaming started:', event.message)
                        break

                    case 'chunk':
                        if (event.content) {
                            setMessages(prev =>
                                prev.map(msg =>
                                    msg.id === botMessageId
                                        ? { ...msg, text: msg.text + event.content }
                                        : msg
                                )
                            )
                        }
                        break

                    case 'complete':
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === botMessageId
                                    ? {
                                        ...msg,
                                        text: event.answer || msg.text,
                                        citations: event.citations || [],
                                        isStreaming: false
                                    }
                                    : msg
                            )
                        )
                        break

                    case 'error':
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === botMessageId
                                    ? {
                                        ...msg,
                                        text: `Due to high demand, please try again later.`,
                                        isStreaming: false
                                    }
                                    : msg
                            )
                        )
                        break
                }
            }
        } catch (error) {
            console.error('Streaming error:', error)
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === botMessageId
                        ? {
                            ...msg,
                            text: 'Failed to connect to chat service. Please try again.',
                            isStreaming: false
                        }
                        : msg
                )
            )
        } finally {
            setIsStreaming(false)
        }
    }, [documentId, isStreaming])

    const deleteDocument = useCallback(async () => {
        if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('bearer_token')
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}documents/${documentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error('Failed to delete document')
                }

                // Add system message about document deletion
                const deleteMessage: Message = {
                    id: Date.now().toString(),
                    text: `Document ${documentId} has been deleted successfully. You will be redirected to the documents page.`,
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                }

                setMessages(prev => [...prev, deleteMessage])

                // Redirect to documents page after a short delay
                setTimeout(() => {
                    window.location.href = '/documents'
                }, 2000)

            } catch (error) {
                console.error('Delete error:', error)
                const errorMessage: Message = {
                    id: Date.now().toString(),
                    text: 'Failed to delete document. Please try again.',
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                }
                setMessages(prev => [...prev, errorMessage])
            }
        }
    }, [documentId])

    const clearMessages = useCallback(() => {
        setMessages([
            {
                id: '1',
                text: 'Hello! I\'m your contract analysis assistant. I can help you understand this document, answer questions about specific clauses, identify potential risks, and explain legal terminology. What would you like to know?',
                sender: 'bot',
                timestamp: new Date().toISOString()
            }
        ])
    }, [])

    return {
        messages,
        isStreaming,
        sendMessage,
        deleteDocument,
        clearMessages
    }
}
