import { BaseValue } from "./base"

export interface AIRule extends BaseValue {
    description: string
}

export interface AIAnalyzeType extends BaseValue {

}

export interface AIAnalyzeForm {
    analysisType: AIAnalyzeType
    customPrompt: string | null
    analysisRule: AIRule[]
}

interface AIEvidence {
    evidence: string
    explanation: string
    mitigation: string
    risk_level: 'Low' | 'Medium' | 'High'
    rule_name: string
}

export interface AIAnalyzeResult {
    executive_summary: string
    overall_risk_score: number // 1 - 10
    findings: AIEvidence[]
}