import { AIAnalyzeForm } from "@/types/aiAnalyze"

export async function doAnalyzeDocument(documentID: number, body: AIAnalyzeForm) {
    if (!documentID) {
        throw new Error('Document not found')
    }
    const token = localStorage.getItem('bearer_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}documents/${documentID}/analyze`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            analysis_type: body.analysisType.key,
            custom_prompt: body.customPrompt ?? null,
            ai_rules: body.analysisRule.map((rule) => {
                return {
                    rules: rule.key,
                    description: rule.description
                }
            })
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch document types')
    }

    return response.json()
}