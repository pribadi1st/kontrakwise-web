export interface BaseValue {
    key: string
    value: string
}

export interface BaseNodeData {
    status?: 'idle' | 'loading' | 'failed' | 'success';
}