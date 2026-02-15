import { Send } from 'lucide-react'

interface ChatInputProps {
    inputMessage: string
    onSendMessage: () => void
    onInputChange: (value: string) => void
    onKeyPress: (e: React.KeyboardEvent) => void
    onQuickAction: (action: string) => void
}

export default function ChatInput({ 
    inputMessage, 
    onSendMessage, 
    onInputChange, 
    onKeyPress, 
    onQuickAction 
}: ChatInputProps) {
    return (
        <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder="Ask about this contract..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                    onClick={onSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={16} />
                </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
                <button 
                    onClick={() => onQuickAction('summarize')}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                    Summarize
                </button>
                <button 
                    onClick={() => onQuickAction('risks')}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                    Risks
                </button>
                <button 
                    onClick={() => onQuickAction('key-terms')}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                    Key terms
                </button>
                <button 
                    onClick={() => onQuickAction('obligations')}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                    Obligations
                </button>
            </div>
        </div>
    )
}
