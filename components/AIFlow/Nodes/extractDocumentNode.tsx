import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { FileText, Settings, Download } from "lucide-react";
import { useCallback } from 'react';
import { BaseNodeData } from "./index";

export type ExtractDocumentNodeData = BaseNodeData & {
    extractionType?: string;
    outputFormat?: string;
    fields?: string[];
}

export type ExtractDocumentNode = Node<ExtractDocumentNodeData>

export function ExtractDocumentNodeComponent({ id, data, isConnectable }: NodeProps<ExtractDocumentNode>) {
    const { updateNodeData } = useReactFlow();

    const handleSettingsClick = useCallback(() => {
        const event = new CustomEvent('nodeSettingsClick', {
            detail: { nodeId: id }
        });
        window.dispatchEvent(event);
    }, [id]);

    return (
        <div className="flex flex-col border border-primary-border rounded">
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <Download className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">{data.label}</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} onClick={handleSettingsClick} />
            </div>
            <div className="flex p-4 flex-col bg-white gap-2">
                <div className="font-medium text-sm">Extraction Type</div>
                <div className="text-xs text-neutral-70">{data.extractionType || 'Not configured'}</div>

                <div className="font-medium text-sm mt-2">Output Format</div>
                <div className="text-xs text-neutral-70">{data.outputFormat || 'JSON'}</div>

                <div className="font-medium text-sm mt-2">Fields to Extract</div>
                <div className="text-xs text-neutral-70">
                    {data.fields && data.fields.length > 0
                        ? data.fields.join(', ')
                        : 'No fields specified'
                    }
                </div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                id="extract-input"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="extract-output"
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
        </div>
    );
}
