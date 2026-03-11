import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { GitBranch, Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import React, { useCallback, useState } from 'react';
import { BaseNodeData } from "./index";
import { getNodeBorderColor } from "@/utils/reactNode/progressState";
import { AIAnalyzeResult } from "@/types/aiAnalyze";
import { AIDecisionDrawer } from "../Drawer/AIDecisionDrawer";
import { errorToast } from "@/utils/functionHelper/toastHelper";

export type AIDecisionNodeData = BaseNodeData & {
    description?: string;
    conditionType: 'risk_score' | 'risk_level' | 'finding_count' | 'custom';
    conditionConfig: {
        operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
        value: number | string;
        riskLevel?: 'Low' | 'Medium' | 'High';
        ruleName?: string;
    };
    trueLabel?: string;
    falseLabel?: string;
    input?: AIAnalyzeResult;
}

export type AIDecisionNode = Node<AIDecisionNodeData>

export function AIDecisionNodeComponent({ id, data, isConnectable }: NodeProps<AIDecisionNode>) {
    const { updateNodeData, getNode } = useReactFlow();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSettingsClick = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const execute = async (): Promise<null | Error> => {
        // Get current node data to avoid closure issues
        const currentNode = getNode(id);
        if (!currentNode) {
            return new Error('Node not found');
        }

        const currentData = currentNode.data as AIDecisionNodeData;

        // Set loading status in node data
        updateNodeData(id, { status: 'loading' });

        if (!currentData.input) {
            updateNodeData(id, { status: 'failed' });
            return new Error('No AI analysis input for decision');
        }

        try {
            let result = false;
            const { conditionType, conditionConfig } = currentData;
            const analysis = currentData.input;

            switch (conditionType) {
                case 'risk_score':
                    const score = analysis.overall_risk_score;
                    const threshold = conditionConfig.value as number;
                    switch (conditionConfig.operator) {
                        case 'gt': result = score > threshold; break;
                        case 'lt': result = score < threshold; break;
                        case 'eq': result = score === threshold; break;
                        case 'gte': result = score >= threshold; break;
                        case 'lte': result = score <= threshold; break;
                    }
                    break;

                case 'risk_level':
                    const hasRiskLevel = analysis.findings.some(
                        (finding: any) => finding.risk_level === conditionConfig.riskLevel
                    );
                    result = conditionConfig.operator === 'eq' ? hasRiskLevel : !hasRiskLevel;
                    break;

                case 'finding_count':
                    const count = analysis.findings.length;
                    const countThreshold = conditionConfig.value as number;
                    switch (conditionConfig.operator) {
                        case 'gt': result = count > countThreshold; break;
                        case 'lt': result = count < countThreshold; break;
                        case 'eq': result = count === countThreshold; break;
                        case 'gte': result = count >= countThreshold; break;
                        case 'lte': result = count <= countThreshold; break;
                    }
                    break;

                case 'custom':
                    // Custom rule-based evaluation
                    if (conditionConfig.ruleName) {
                        const customFinding = analysis.findings.find(
                            (finding: any) => finding.rule_name === conditionConfig.ruleName
                        );
                        if (customFinding) {
                            const riskValue = customFinding.risk_level === 'High' ? 3 :
                                customFinding.risk_level === 'Medium' ? 2 : 1;
                            const customThreshold = conditionConfig.value as number;
                            switch (conditionConfig.operator) {
                                case 'gt': result = riskValue > customThreshold; break;
                                case 'lt': result = riskValue < customThreshold; break;
                                case 'eq': result = riskValue === customThreshold; break;
                                case 'gte': result = riskValue >= customThreshold; break;
                                case 'lte': result = riskValue <= customThreshold; break;
                            }
                        }
                    }
                    break;
            }

            // Set the decision result and pass through the analysis
            updateNodeData(id, {
                output: {
                    ...analysis,
                    decision: result,
                    decisionPath: result ? 'true' : 'false'
                },
                status: 'success'
            });

            return null;
        } catch (error) {
            errorToast(`AI decision failed: ${error}`);
            updateNodeData(id, { status: 'failed' });
            return error as Error;
        }
    };

    // Initialize execute method in node data
    React.useEffect(() => {
        if (!data.execute) {
            updateNodeData(id, { execute });
        }
    }, [id, data.execute, updateNodeData]);

    const handleSave = (nodeId: string, newData: Partial<AIDecisionNodeData>) => {
        updateNodeData(nodeId, newData);
        setIsDrawerOpen(false);
    };

    const getConditionDescription = () => {
        const { conditionType, conditionConfig } = data;
        if (!conditionType || !conditionConfig) return 'No condition configured';

        switch (conditionType) {
            case 'risk_score':
                return `Risk Score ${conditionConfig.operator} ${conditionConfig.value}`;
            case 'risk_level':
                return `Has ${conditionConfig.riskLevel} risk findings`;
            case 'finding_count':
                return `Finding count ${conditionConfig.operator} ${conditionConfig.value}`;
            case 'custom':
                return `Rule: ${conditionConfig.ruleName || 'None'} ${conditionConfig.operator} ${conditionConfig.value}`;
            default:
                return 'Unknown condition';
        }
    };

    const getRiskIcon = (riskLevel?: string) => {
        switch (riskLevel) {
            case 'High': return <AlertTriangle className="w-3 h-3 text-red-500" />;
            case 'Medium': return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
            case 'Low': return <CheckCircle className="w-3 h-3 text-green-500" />;
            default: return <XCircle className="w-3 h-3 text-gray-400" />;
        }
    };

    return (
        <div className={`flex flex-col border ${getNodeBorderColor(data.status)} rounded`}>
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">AI Decision</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Condition</div>
                <div className="text-xs text-neutral-70">{getConditionDescription()}</div>

                {data.input && (
                    <>
                        <div className="font-medium text-sm mt-2">Analysis Summary</div>
                        <div className="text-xs text-neutral-70 truncate">
                            Risk Score: {data.input.overall_risk_score}/10
                        </div>
                        <div className="text-xs text-neutral-70">
                            Findings: {data.input?.findings?.length} total
                        </div>
                        <div className="flex gap-2 mt-1">
                            {['High', 'Medium', 'Low'].map(level => {
                                const count = data.input!.findings.filter((f: any) => f.risk_level === level).length;
                                return count > 0 ? (
                                    <div key={level} className="flex items-center gap-1">
                                        {getRiskIcon(level)}
                                        <span className="text-xs text-neutral-60">{count}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </>
                )}

                <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-xs text-neutral-70">{data.trueLabel || 'True'}</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="text-xs text-neutral-70">{data.falseLabel || 'False'}</div>
                    </div>
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Top}
                id="decision-input"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
            <Handle
                type="source"
                position={Position.Left}
                id="decision-true"
                isConnectable={isConnectable}
                style={{ background: '#10b981', border: '2px solid #10b981' }}
                className="w-5 h-5"
                title="True"
            />
            <Handle
                type="source"
                position={Position.Right}
                id="decision-false"
                isConnectable={isConnectable}
                style={{ background: '#ef4444', border: '2px solid #ef4444' }}
                className="w-5 h-5"
                title="False"
            />

            {/* AI Decision Drawer */}
            <AIDecisionDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                nodeData={data}
                nodeId={id}
                onSave={handleSave}
            />
        </div>
    );
}
