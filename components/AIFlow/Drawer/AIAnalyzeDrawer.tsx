"use client"

import { useMemo, useState } from 'react'
import { Brain, Plus, Save, Square, SquareCheckBig } from 'lucide-react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AiAnalyzeNodeData } from '../Nodes/aiAnalyzeNode'
import { analysisTypes, defaultRules } from '@/utils/constants/AiAnalyzeConst'
import { AIAnalyzeForm, AIRule } from '@/types/aiAnalyze'
import { useForm, Controller } from 'react-hook-form'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'

interface AIAnalyzeDrawerProps {
    isOpen: boolean
    onClose: () => void
    nodeData: AiAnalyzeNodeData
    nodeId: string
    onSave: (nodeId: string, data: Partial<AiAnalyzeNodeData>) => void
}

export function AIAnalyzeDrawer({ isOpen, onClose, nodeData, nodeId, onSave }: AIAnalyzeDrawerProps) {
    const { register, handleSubmit, control, watch, setValue, formState, getValues } = useForm<AIAnalyzeForm>({
        defaultValues: {
            analysisType: nodeData.analysisType,
            customPrompt: nodeData.prompt || '',
            analysisRule: nodeData.rules || []
        }
    })

    const [newRule, setNewRule] = useState({
        name: '',
        description: ''
    })
    const selectedAnalysisType = watch('analysisType')
    const selectedRules = watch('analysisRule').map(rule => rule.key)

    const handleAddRule = () => {
        const { name, description } = newRule
        if (name.trim() && description.trim()) {
            const currentRules = watch('analysisRule') || []
            const newKey = 'custom_' + name.toLowerCase().replace(/\s+/g, '_')
            const newRuleKey: AIRule = {
                key: newKey,
                value: name,
                description: description
            }
            defaultRules[selectedAnalysisType?.value].push(newRuleKey)
            setValue('analysisRule', [...currentRules, newRuleKey])
            setNewRule({ name: '', description: '' })
        }
    }
    const changeAnalysisType = () => {
        setValue('analysisRule', [])
    }

    const listRules = useMemo(() => {
        if (!selectedAnalysisType) return []
        return defaultRules[selectedAnalysisType.key] || []
    }, [selectedAnalysisType])

    const toogleRule = (rule: AIRule) => {
        const currentRules = watch('analysisRule') || []
        const isExist = currentRules.some((r: AIRule) => r.key === rule.key)
        if (isExist) {
            setValue('analysisRule', currentRules.filter((r: AIRule) => r.key !== rule.key))
        } else {
            setValue('analysisRule', [...currentRules, rule])
        }
    }

    const submitForm = () => {
        console.log(formState.isValid)
        // if (formState.isValid) {
        nodeData.analysisType = getValues('analysisType')
        nodeData.prompt = getValues('customPrompt') || ''
        nodeData.rules = getValues('analysisRule')
        onSave(nodeId, nodeData)
        onClose()
        // }
    }

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="h-full w-[500px] max-w-none rounded-none bg-white">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        AI Analyzer Configuration
                    </DrawerTitle>
                    <DrawerDescription>
                        Configure the AI analysis parameters and rules
                    </DrawerDescription>
                </DrawerHeader>
                <form >
                    <div className="flex-1 px-4 pb-4 overflow-y-auto space-y-6">
                        {/* Analysis Type */}
                        <div className="space-y-2">
                            <Field>
                                <FieldLabel htmlFor="analysisType">Analysis Type</FieldLabel>
                                <Controller
                                    name="analysisType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value?.key}
                                            onValueChange={(value) => {
                                                const selectedType = analysisTypes.find(type => type.key === value)
                                                console.log("selected Type [134]: ", selectedType)
                                                field.onChange({ key: selectedType?.key || '', value: selectedType?.value || '' })
                                                changeAnalysisType()
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select analysis type" />
                                            </SelectTrigger>
                                            <SelectContent className='bg-white'>
                                                {analysisTypes.map((type) => (
                                                    <SelectItem key={type.key} value={type.key}>
                                                        {type.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </Field>
                        </div>

                        {/* Custom Prompt */}
                        <div className="space-y-2">
                            <Field>
                                <FieldLabel htmlFor="customPrompt">Custom Prompt</FieldLabel>
                                <textarea
                                    id="customPrompt"
                                    placeholder="Use your own prompt to override the default behavior for the selected analysis type."
                                    className="min-h-[120px] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    {...register('customPrompt')}
                                />
                                <FieldDescription className="text-xs text-gray-500">
                                    This prompt will override the default behavior for the selected analysis type.
                                </FieldDescription>
                            </Field>
                        </div>

                        {/* Rules Section */}
                        {getValues('analysisType.value') &&
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-medium">Analysis Rules</Label>
                                    <span className="text-xs text-gray-500">
                                        {selectedRules?.length || 0} active
                                    </span>
                                </div>

                                {/* Existing Rules */}
                                <div className="space-y-2">
                                    {listRules.map((rule) => {
                                        const isSelected = selectedRules.includes(rule.key)
                                        return (
                                            <div
                                                key={rule.key}
                                                className={`
                                                    border rounded-lg p-3 space-y-2 cursor-pointer
                                                    ${isSelected ?
                                                        'border-primary-border bg-primary-surface'
                                                        : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                onClick={() => toogleRule(rule)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            {
                                                                isSelected ?
                                                                    <SquareCheckBig size={15} className='text-primary' /> :
                                                                    <Square size={15} />
                                                            }
                                                            <h4 className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-gray-600'
                                                                }`}>
                                                                {rule.value}
                                                            </h4>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mt-1 ml-6">
                                                            {rule.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Add New Rule */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
                                    <h4 className="font-medium text-sm text-gray-700">Add New Rule</h4>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Rule name"
                                            value={newRule.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        <Input
                                            placeholder="Rule description"
                                            value={newRule.description}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleAddRule}
                                        disabled={!newRule.name.trim() || !newRule.description.trim()}
                                        variant="outline"
                                        type="button"
                                        size="sm"
                                        className="w-full"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Rule
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </form>
                <DrawerFooter className="border-t">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={submitForm}
                            className="flex-1 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Configuration
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}
