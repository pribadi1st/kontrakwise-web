export interface Citation {
    page: string
    text: string
}

export interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: string
    isStreaming?: boolean
    citations?: Citation[]
}

export interface ChatProps {
    messages: Message[]
    inputMessage: string
    isTyping: boolean
    isChatExpanded: boolean
    onSendMessage: () => void
    onInputChange: (value: string) => void
    onKeyPress: (e: React.KeyboardEvent) => void
    onToggleExpanded: () => void
    onQuickAction: (action: string) => void
}
