import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { Split, Settings } from "lucide-react";
import { useCallback } from 'react';
import { BaseNodeData } from "./index";

export type DecisionNodeData = BaseNodeData & {
    description?: string;
    condition?: string;
    trueLabel?: string;
    falseLabel?: string;
}

export type DecisionNode = Node<DecisionNodeData>

export function DecisionNodeComponent({ id, data, isConnectable }: NodeProps<DecisionNode>) {
    const { updateNodeData } = useReactFlow();

    const handleSettingsClick = useCallback(() => {
        // Create a custom event that can be handled by the parent component
        const event = new CustomEvent('nodeSettingsClick', {
            detail: { nodeId: id }
        });
        window.dispatchEvent(event);
    }, [id]);
    return (
        <div className="flex flex-col border border-primary-border rounded">
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <Split className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">Decision Tree</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Condition</div>
                <div className="text-xs text-neutral-70">{data.condition || 'No condition set'}</div>
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
        </div>
    );
}
