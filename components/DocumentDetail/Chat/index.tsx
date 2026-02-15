import { ChatProps } from './types'
import ChatHeader from './Header'
import ChatMessages from './Messages'
import ChatInput from './Input'

export default function Chat({ 
    messages, 
    inputMessage, 
    isTyping, 
    isChatExpanded, 
    onSendMessage, 
    onInputChange, 
    onKeyPress, 
    onToggleExpanded, 
    onQuickAction 
}: ChatProps) {
    return (
        <div className={`bg-white border-l border-gray-200 flex flex-col ${isChatExpanded ? 'w-96' : 'w-80'} transition-all duration-300`}>
            <ChatHeader isExpanded={isChatExpanded} onToggleExpanded={onToggleExpanded} />
            <ChatMessages messages={messages} isTyping={isTyping} />
            <ChatInput 
                inputMessage={inputMessage}
                onSendMessage={onSendMessage}
                onInputChange={onInputChange}
                onKeyPress={onKeyPress}
                onQuickAction={onQuickAction}
            />
        </div>
    )
}
