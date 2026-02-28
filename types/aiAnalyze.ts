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