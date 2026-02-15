import { Bot, Maximize2, Minimize2 } from 'lucide-react'

interface ChatHeaderProps {
    isExpanded: boolean
    onToggleExpanded: () => void
}

export default function ChatHeader({ isExpanded, onToggleExpanded }: ChatHeaderProps) {
    return (
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Bot size={18} className="text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Contract Assistant</h3>
                    <p className="text-xs text-gray-500">AI-powered analysis</p>
                </div>
            </div>
            <button
                onClick={onToggleExpanded}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
        </div>
    )
}
