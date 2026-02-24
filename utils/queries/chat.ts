import { API_BASE_URL } from './base'

export interface ChatRequest {
    query: string
    document_id: number
}

export interface ChatResponse {
    answer: string
    citations: Array<{
        page: string
        text: string
    }>
}

export interface StreamingEvent {
    type: 'start' | 'chunk' | 'complete' | 'error'
    content?: string
    message?: string
    answer?: string
    citations?: Array<{
        page: string
        text: string
    }>
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    const token = localStorage.getItem('bearer_token')

    const response = await fetch(`${API_BASE_URL}/chat/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
    })

    if (!response.ok) {
        throw new Error('Failed to send chat message')
    }

    return response.json()
}

export async function* sendStreamingChatMessage(request: ChatRequest): AsyncGenerator<StreamingEvent> {
    const token = localStorage.getItem('bearer_token')

    const response = await fetch(`${API_BASE_URL}chat/query-stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
    })

    if (!response.ok) {
        throw new Error('Failed to start streaming chat')
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
        throw new Error('No response body')
    }

    try {
        while (true) {
            const { done, value } = await reader.read()

            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const jsonStr = line.slice(6) // Remove 'data: ' prefix
                        const event = JSON.parse(jsonStr) as StreamingEvent
                        yield event
                    } catch (e) {
                        console.error('Failed to parse SSE event:', line)
                    }
                }
            }
        }
    } finally {
        reader.releaseLock()
    }
}
