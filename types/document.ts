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
}