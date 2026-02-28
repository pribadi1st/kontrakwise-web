import { Drawer } from "@/components/ui/drawer";
import { Document } from "@/types/document";
import { Handle, Position, useReactFlow } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { FileText, Settings } from "lucide-react";
import { useState } from "react";
import { DocumentDrawer } from "../Drawer/DocumentDrawer";

export type DocumentNodeData = {
    selectedDocument: Document | null;
}

export type DocumentNodeProp = Node<DocumentNodeData>

export function DocumentNodeComponent({ id, data, isConnectable }: NodeProps<DocumentNodeProp>) {
    const { updateNodeData } = useReactFlow();

    const [isDrawerOpen, setDrawerState] = useState<boolean>(false)

    const handleDocumentSelect = (document: Document) => {
        updateNodeData(id, { selectedDocument: document });
        setDrawerState(false);
    };

    return (
        <div className="flex flex-col border border-primary-border rounded">
            <DocumentDrawer
                isOpen={isDrawerOpen}
                onClose={() => setDrawerState(false)}
                onDocumentSelect={handleDocumentSelect}
                selectedDocumentId={data.selectedDocument?.id ?? null}
                nodeId={id}
            />
            <div className="flex-between items-center bg-primary-surface p-4">
                <div className="flex-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <div className="font-medium text-sm">Select Document</div>
                </div>
                <Settings className="text-primary cursor-pointer" size={16} onClick={() => setDrawerState(true)} />
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