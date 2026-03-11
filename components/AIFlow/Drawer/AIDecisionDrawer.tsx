"use client"

import { useState } from 'react'
import { GitBranch, Save } from 'lucide-react'
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
import { AIDecisionNodeData } from '../Nodes/aiDecisionNode'

interface AIDecisionDrawerProps {
    isOpen: boolean
    onClose: () => void
    nodeData: AIDecisionNodeData
    nodeId: string
    onSave: (nodeId: string, data: Partial<AIDecisionNodeData>) => void
}

export function AIDecisionDrawer({ isOpen, onClose, nodeData, nodeId, onSave }: AIDecisionDrawerProps) {
    const [formData, setFormData] = useState({
        conditionType: nodeData.conditionType || 'risk_score',
        operator: nodeData.conditionConfig?.operator || 'gt',
        value: nodeData.conditionConfig?.value || 5,
        riskLevel: nodeData.conditionConfig?.riskLevel || 'Medium',
        ruleName: nodeData.conditionConfig?.ruleName || '',
        trueLabel: nodeData.trueLabel || 'True',
        falseLabel: nodeData.falseLabel || 'False',
        description: nodeData.description || ''
    });

    const handleSubmit = () => {
        const updatedData: Partial<AIDecisionNodeData> = {
            conditionType: formData.conditionType as any,
            conditionConfig: {
                operator: formData.operator as any,
                value: formData.value,
                riskLevel: formData.riskLevel as any,
                ruleName: formData.ruleName || undefined
            },
            trueLabel: formData.trueLabel,
            falseLabel: formData.falseLabel,
            description: formData.description
        };

        onSave(nodeId, updatedData);
        onClose();
    };

    const getOperatorLabel = (operator: string) => {
        switch (operator) {
            case 'gt': return '>';
            case 'gte': return '>=';
            case 'lt': return '<';
            case 'lte': return '<=';
            case 'eq': return '=';
            default: return operator;
        }
    };

    const getConditionDescription = () => {
        const { conditionType, operator, value, riskLevel, ruleName } = formData;

        switch (conditionType) {
            case 'risk_score':
                return `Risk Score ${getOperatorLabel(operator)} ${value}`;
            case 'risk_level':
                return `Has ${riskLevel} risk findings`;
            case 'finding_count':
                return `Finding count ${getOperatorLabel(operator)} ${value}`;
            case 'custom':
                return `Rule: ${ruleName || 'None'} ${getOperatorLabel(operator)} ${value}`;
            default:
                return 'Unknown condition';
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="h-full w-[500px] max-w-none rounded-none bg-white">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-primary" />
                        AI Decision Configuration
                    </DrawerTitle>
                    <DrawerDescription>
                        Configure decision logic based on AI analysis results
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 px-4 pb-4 overflow-y-auto space-y-6">
                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Describe what this decision node evaluates"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    {/* Condition Type */}
                    <div className="space-y-2">
                        <Label>Condition Type</Label>
                        <Select
                            value={formData.conditionType}
                            onValueChange={(value: "risk_score" | "risk_level" | "finding_count" | "custom") => setFormData(prev => ({ ...prev, conditionType: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                <SelectItem value="risk_score">Risk Score</SelectItem>
                                <SelectItem value="risk_level">Risk Level</SelectItem>
                                <SelectItem value="finding_count">Finding Count</SelectItem>
                                <SelectItem value="custom">Custom Rule</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Condition Configuration */}
                    <div className="space-y-2">
                        <Label>Condition Configuration</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">
                            <div className="text-sm font-medium text-gray-700">
                                {getConditionDescription()}
                            </div>
                        </div>
                    </div>

                    {/* Operator and Value */}
                    {formData.conditionType !== 'risk_level' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Operator</Label>
                                <Select
                                    value={formData.operator}
                                    onValueChange={(value: "gt" | "gte" | "lt" | "lte" | "eq") => setFormData(prev => ({ ...prev, operator: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectItem value="gt">Greater than (&gt;)</SelectItem>
                                        <SelectItem value="gte">Greater or equal (&gt;=)</SelectItem>
                                        <SelectItem value="lt">Less than (&lt;)</SelectItem>
                                        <SelectItem value="lte">Less or equal (&lt;=)</SelectItem>
                                        <SelectItem value="eq">Equal (=)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    {formData.conditionType === 'finding_count' ? 'Count' :
                                        formData.conditionType === 'custom' ? 'Risk Value (1=Low, 2=Medium, 3=High)' :
                                            'Score'}
                                </Label>
                                <Input
                                    type="number"
                                    value={formData.value}
                                    onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
                                    min={formData.conditionType === 'custom' ? 1 : 0}
                                    max={formData.conditionType === 'risk_score' ? 10 : formData.conditionType === 'custom' ? 3 : 100}
                                />
                            </div>
                        </div>
                    )}

                    {/* Risk Level Selection */}
                    {formData.conditionType === 'risk_level' && (
                        <div className="space-y-2">
                            <Label>Risk Level</Label>
                            <Select
                                value={formData.riskLevel}
                                onValueChange={(value: "High" | "Medium" | "Low") => setFormData(prev => ({ ...prev, riskLevel: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                    <SelectItem value="High">High Risk</SelectItem>
                                    <SelectItem value="Medium">Medium Risk</SelectItem>
                                    <SelectItem value="Low">Low Risk</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Custom Rule Name */}
                    {formData.conditionType === 'custom' && (
                        <div className="space-y-2">
                            <Label>Rule Name</Label>
                            <Input
                                placeholder="e.g., ambiguous_wording, compliance, liability_clause"
                                value={formData.ruleName}
                                onChange={(e) => setFormData(prev => ({ ...prev, ruleName: e.target.value }))}
                            />
                            <div className="text-xs text-gray-500">
                                Enter the exact rule name from the analysis findings
                            </div>
                        </div>
                    )}

                    {/* Examples */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Common Examples</Label>
                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="p-2 bg-gray-50 rounded">
                                <strong>High Risk Alert:</strong> Risk level = High, operator = eq
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                                <strong>Too Many Issues:</strong> Finding count &gt; 5
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                                <strong>Ambiguous Clauses:</strong> Custom rule = ambiguous_wording, risk value &gt; 1
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                                <strong>Acceptable Risk:</strong> Risk score &lt;= 5
                            </div>
                        </div>
                    </div>
                </div>

                <DrawerFooter className="border-t">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Configuration
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
