import { Document } from "@/types/document";
import { Handle, Position, useReactFlow, useEdges } from "@xyflow/react"
import type { NodeProps, Node } from "@xyflow/react";
import { FileText, Settings } from "lucide-react";
import React, { useState } from "react";
import { DocumentDrawer } from "../Drawer/DocumentDrawer";
import { getNodeBorderColor } from "@/utils/reactNode/progressState";
import { BaseNodeData } from ".";

export type DocumentNodeData = BaseNodeData & {
    selectedDocument: Document | null;
    output: Document | null;
}

export type DocumentNodeProp = Node<DocumentNodeData>

export function DocumentNodeComponent({ id, data, isConnectable }: NodeProps<DocumentNodeProp>) {
    const { updateNodeData, getNode } = useReactFlow();
    const edges = useEdges();

    const [isDrawerOpen, setDrawerState] = useState<boolean>(false)

    // Execute method for this node
    const execute = async (): Promise<null | Error> => {
        // Get current node data to avoid closure issues
        const currentNode = getNode(id);
        if (!currentNode) {
            return new Error('Node not found');
        }

        const currentData = currentNode.data as DocumentNodeData;

        // Set loading status in node data
        updateNodeData(id, { status: 'loading' });

        if (!currentData.selectedDocument) {
            console.warn('No document selected to execute');
            updateNodeData(id, { status: 'failed' });
            return new Error('no document selected');
        }

        // Update output with the selected document
        updateNodeData(id, { output: currentData.selectedDocument, status: 'success' });
        return null;
    };

    // Initialize execute method in node data
    React.useEffect(() => {
        if (!data.execute) {
            updateNodeData(id, { execute });
        }
    }, [id, data.execute, updateNodeData]);

    // Find connected nodes
    const connectedNodes = edges
        .filter(edge => edge.source === id || edge.target === id)
        .map(edge => {
            if (edge.source === id) {
                return { nodeId: edge.target, type: 'output' };
            } else {
                return { nodeId: edge.source, type: 'input' };
            }
        });

    const handleDocumentSelect = (document: Document) => {

        // Update this node's data
        updateNodeData(id, { selectedDocument: document, output: document });

        // Update connected nodes
        connectedNodes.forEach(connectedNode => {
            if (connectedNode.type === 'output') {
                // This node is the source, get the target node
                const targetNode = getNode(connectedNode.nodeId);

                if (!targetNode) return;

                // Only update if target node can accept Document input
                const canAcceptDocument = targetNode.type === 'ai-analyze';

                if (canAcceptDocument) {
                    updateNodeData(connectedNode.nodeId, {
                        input: document
                    });
                    console.log('Updated target node with document', targetNode);
                } else {
                    console.warn('Cannot update: target node cannot accept Document input', targetNode);
                }
            }
        });

        setDrawerState(false);
    };

    return (
        <div className={`flex flex-col border rounded ${getNodeBorderColor(data.status || 'idle')}`}>
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
                id={`${id}-input`}
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id={`${id}-output`}
                isConnectable={isConnectable}
                style={{ background: '#169ad9', border: '2px solid #169ad9' }}
                className="w-5 h-5"
            />
        </div>
    );
}