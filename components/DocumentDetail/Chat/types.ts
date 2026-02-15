export interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: string
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
