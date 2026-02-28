import { AIRule } from "@/types/aiAnalyze"

export const analysisTypes = [
    { key: 'risk_assessment', value: 'Risk Assessment' },
    { key: 'compliance_check', value: 'Compliance Check' },
    { key: 'clause_extraction', value: 'Clause Extraction' },
]

export const defaultRules: Record<string, AIRule[]> = {
    "risk_assessment": [
        {
            key: "termination_clause",
            value: "Check termination clause",
            description: "verify that both parties can terminate with reasonable notice"
        },
        {
            key: "liability_clause",
            value: "Check liability clause",
            description: "detect any clause that imposes unlimited or disproportionate liability.",
        },
        {
            key: "ambiguous_wording",
            value: "Detect ambiguous wording",
            description: "identify vague or unclear contractual language.",
        },
        {
            key: "compliance",
            value: "Check compliance",
            description: "verify that the contract follows relevant regulations and standards.",
        }
    ],
    "compliance_check": [
        {
            key: "gdpr_compliance",
            value: "Check GDPR compliance",
            description: "identify any data handling clauses that violate GDPR principles.",
        },
        {
            key: "tax_compliance",
            value: "Check tax regulation compliance",
            description: "verify tax obligations are properly stated.",
        },
        {
            key: "labor_compliance",
            value: "Check labor law compliance",
            description: "ensure clauses do not violate labor regulations.",
        }
    ],
    "clause_extraction": [
        {
            key: "important_clauses",
            value: "Extract important clauses",
            description: "extract important clauses from the contract.",
        }
    ]
}
