export interface Document {
    id: number;
    filename: string;
    created_at: string;
    ai_progress: string;
    summary?: string;
    document_type: DocumentType;
    type?: string;
    risk_level?: 'high' | 'medium' | 'low';
    risk_reasoning?: string;
    status?: 'analyzed' | 'reviewing' | 'draft';
}

export interface DocumentType {
    id: number
    name: string
    description?: string
    risk_rules?: RiskRule[]
}

export interface FormDocumentType {
    id?: number
    name: string
    description: string
    risk_rules?: RiskRule[]
}

export interface RiskRule {
    id?: number
    clause: string
    severity: 'high' | 'medium' | 'low'
    criteria: string
}