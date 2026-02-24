import { Bot, User, FileText } from 'lucide-react'
import { Message } from './types'
import { DateConverter } from '@/utils/converter'

interface ChatMessagesProps {
    messages: Message[]
    isTyping: boolean
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    {message.sender === 'bot' && (
                        <div className="p-2 rounded-lg shrink-0">
                            <Bot size={16} className="text-primary bg-primary/10" />
                        </div>
                    )}
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                        <div
                            className={`rounded-lg px-4 py-2 ${message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            {message.isStreaming && (
                                <div className="flex gap-1 mt-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            )}
                        </div>

                        {/* Display citations for bot messages */}
                        {message.sender === 'bot' && message.citations && message.citations.length > 0 && (
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText size={14} className="text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-800">Sources</span>
                                </div>
                                <div className="space-y-2">
                                    {message.citations.map((citation, index) => (
                                        <div key={index} className="text-xs">
                                            <span className="font-medium text-blue-700">Page {citation.page}:</span>
                                            <p className="text-gray-700 mt-1 italic">"{citation.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <p className="text-xs text-gray-500 mt-1 px-1">
                            {DateConverter(message.timestamp)}
                        </p>
                    </div>
                    {message.sender === 'user' && (
                        <div className="p-2 rounded-lg shrink-0">
                            <User size={24} className="text-gray-600 bg-gray-200 p-1 rounded-full" />
                        </div>
                    )}
                </div>
            ))}
            {isTyping && !messages.some(m => m.isStreaming) && (
                <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Bot size={16} className="text-primary" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
