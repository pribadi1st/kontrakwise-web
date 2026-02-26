export interface Document {
    id: number;
    filename: string;
    created_at: string;
    type?: string;
    riskLevel?: 'high' | 'medium' | 'low';
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