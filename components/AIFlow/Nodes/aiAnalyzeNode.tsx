import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { Brain, PlayIcon, Settings } from "lucide-react";
import React, { useCallback, useState } from 'react';
import { BaseNodeData } from "./index";
import { AIAnalyzeDrawer } from '../Drawer/AIAnalyzeDrawer';
import { AIAnalyzeType, AIRule } from "@/types/aiAnalyze";
import { Document } from "@/types/document";
import { getNodeBorderColor } from "@/utils/reactNode/progressState";

export type AiAnalyzeNodeData = BaseNodeData & {
    description?: string;
    analysisType?: AIAnalyzeType;
    prompt?: string;
    rules?: AIRule[];
    input: Document;
}

export type AiAnalyzeNode = Node<AiAnalyzeNodeData>

export function AiAnalyzeNodeComponent({ id, data, isConnectable }: NodeProps<AiAnalyzeNode>) {
    const { updateNodeData, getNode } = useReactFlow();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSettingsClick = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    // Execute method for this node
    const execute = async (): Promise<null | Error> => {
        // Get current node data to avoid closure issues
        const currentNode = getNode(id);
        if (!currentNode) {
            return new Error('Node not found');
        }

        const currentData = currentNode.data as AiAnalyzeNodeData;

        // Set loading status in node data
        updateNodeData(id, { status: 'loading' });

        if (!currentData.input) {
            console.warn('No document input to execute AI analysis');
            updateNodeData(id, { status: 'failed' });
            return new Error('no document input for AI analysis');
        }

        if (!currentData.analysisType) {
            console.warn('No analysis type configured');
            updateNodeData(id, { status: 'failed' });
            return new Error('no analysis type configured');
        }

        try {
            // TODO: Implement actual AI analysis logic here
            console.log('Executing AI analysis with:', {
                document: currentData.input.filename,
                type: currentData.analysisType.value,
                prompt: currentData.prompt,
                rules: currentData.rules?.length || 0
            });

            // Simulate AI processing
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For now, just pass through the document as output
            // In real implementation, this would be the analysis result
            updateNodeData(id, {
                output: currentData.input,
                status: 'success'
            });

            return null;
        } catch (error) {
            console.error('AI analysis failed:', error);
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

    const analyzeData = () => {
        console.log("analyzeData")
    }

    const handleSave = (nodeId: string, newData: Partial<AiAnalyzeNodeData>) => {
        updateNodeData(nodeId, newData);
        setIsDrawerOpen(false);
    };
    return (
        <div className={`flex flex-col border ${getNodeBorderColor(data.status)} rounded `}>
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">AI Analyze</div>
                </div>
                <div className="flex-center gap-2">
                    <PlayIcon size={16} className="cursor-pointer text-warning" fill="#FAAD14" onClick={analyzeData} />
                    <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
                </div>
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Document</div>
                <div className="text-xs text-neutral-70">
                    {data.input ? data.input.filename : 'No document connected'}
                </div>
                <div className="font-medium text-sm mt-2">Analysis Type</div>
                <div className="text-xs text-neutral-70">{data.analysisType?.value || 'Not configured'}</div>
                <div className="font-medium text-sm mt-2">Prompt</div>
                <div className="text-xs text-neutral-70 truncate">{data.prompt || 'No custom prompt given'}</div>
                <div className="font-medium text-sm mt-2">Rules</div>
                <div className="text-xs text-neutral-70">
                    {data.rules && data.rules.length > 0
                        ? `${data.rules.length} rule(s) selected`
                        : 'No rules selected'
                    }
                </div>
            </div>


            <Handle
                type="target"
                position={Position.Top}
                id="ai-input"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="ai-output"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />

            {/* AI Analyzer Drawer */}
            <AIAnalyzeDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                nodeData={data}
                nodeId={id}
                onSave={handleSave}
            />
        </div>
    );
}
