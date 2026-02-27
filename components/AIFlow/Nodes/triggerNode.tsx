import { Handle, Position } from "@xyflow/react"
import type { Node, NodeProps } from "@xyflow/react";
import { Zap } from "lucide-react";

export type TriggerNodeData = {
    lable: string;
    description: string;
}

export type TriggerNode = Node & {
    type: "trigger";
};

export function TriggerNodeComponent({ isConnectable }: NodeProps<TriggerNode>) {
    return (
        <div className="flex flex-col border border-primary-border rounded">
            <div className="flex items-center gap-2 bg-primary-surface p-4">
                <Zap className="w-4 h-4 text-warning" />
                <div className="font-medium text-sm">Start Workflow</div>
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Trigger Workflow</div>
                <div className="text-xs text-neutral-70">This is startpoint of your workflow</div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="trigger-output"
                isConnectable={isConnectable}
                color="#169ad9"
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5 bg-primary-surface"
            />
        </div>
    );
}