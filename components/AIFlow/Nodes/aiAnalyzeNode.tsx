import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { Brain, Settings } from "lucide-react";
import { useCallback, useState } from 'react';
import { BaseNodeData } from "./index";
import { AIAnalyzeDrawer } from '../Drawer/AIAnalyzeDrawer';
import { AIAnalyzeType, AIRule } from "@/types/aiAnalyze";

export type AiAnalyzeNodeData = BaseNodeData & {
    description?: string;
    analysisType?: AIAnalyzeType;
    prompt?: string;
    rules?: AIRule[];
}

export type AiAnalyzeNode = Node<AiAnalyzeNodeData>

export function AiAnalyzeNodeComponent({ id, data, isConnectable }: NodeProps<AiAnalyzeNode>) {
    const { updateNodeData } = useReactFlow();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSettingsClick = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const handleSave = (nodeId: string, newData: Partial<AiAnalyzeNodeData>) => {
        updateNodeData(nodeId, newData);
        setIsDrawerOpen(false);
    };
    return (
        <div className="flex flex-col border border-primary-border rounded ">
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">AI Analyze</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Analysis Type</div>
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
