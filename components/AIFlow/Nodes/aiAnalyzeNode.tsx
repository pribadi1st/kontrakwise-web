import { Handle, Position } from "@xyflow/react"
import type { Node, NodeProps } from "@xyflow/react";
import { Brain, Settings } from "lucide-react";

export type AiAnalyzeNodeData = {
    label: string;
    description: string;
    analysisType: string;
    prompt: string;
}

export type AiAnalyzeNode = Node<AiAnalyzeNodeData>

export function AiAnalyzeNodeComponent({ data, isConnectable }: NodeProps<AiAnalyzeNode>) {
    return (
        <div className="flex flex-col border border-primary-border rounded">
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">AI Analyze</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Analysis Type</div>
                <div className="text-xs text-neutral-70">{data.analysisType || 'Not configured'}</div>
                <div className="font-medium text-sm mt-2">Prompt</div>
                <div className="text-xs text-neutral-70 truncate">{data.prompt || 'No prompt set'}</div>
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
        </div>
    );
}
