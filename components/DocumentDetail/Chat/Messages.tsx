import { Bot, User } from 'lucide-react'
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
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Bot size={16} className="text-primary" />
                        </div>
                    )}
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                        <div
                            className={`rounded-lg px-4 py-2 ${message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-1">
                            {DateConverter(message.timestamp)}
                        </p>
                    </div>
                    {message.sender === 'user' && (
                        <div className="p-2 bg-gray-200 rounded-lg shrink-0">
                            <User size={16} className="text-gray-600" />
                        </div>
                    )}
                </div>
            ))}
            {isTyping && (
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
