import { Document } from "@/types/document";
import { Handle, Position } from "@xyflow/react"
import type { Node, NodeProps } from "@xyflow/react";
import { FileText, Settings } from "lucide-react";

export type DocumentNodeData = {
    label: string;
    description: string;
    selectedDocument: Document | null
}

export type DocumentNode = Node<DocumentNodeData>

export function DocumentNodeComponent({ data, isConnectable }: NodeProps<DocumentNode>) {
    return (
        <div className="flex flex-col border border-primary-border rounded">
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">Select Document</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Selected Document</div>
                <div className="text-xs text-neutral-70">{data.selectedDocument?.filename || 'No document selected'}</div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                id="document-input"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="document-output"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
        </div>
    );
}