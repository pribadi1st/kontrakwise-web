"use client"
import { useCallback } from 'react';
import {
    ReactFlow, applyNodeChanges, applyEdgeChanges,
    addEdge, Background, useReactFlow, ReactFlowProvider,
    useNodesState, useEdgesState,
} from '@xyflow/react';
import { NODE_LIST, NodeInterface } from './Drawer/constant';
import { uuidv7 } from 'uuidv7';
import { DynamicIcon } from 'lucide-react/dynamic';
import '@xyflow/react/dist/style.css';
import { initialNodes, nodeTypes } from './Nodes';

function AIComponentPageWrapper() {
    return (
        <ReactFlowProvider>
            <AIComponentPage />
        </ReactFlowProvider>
    );
}

function AIComponentPage() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState([]);
    const { screenToFlowPosition, updateNodeData } = useReactFlow();
    const nodeCategories = NODE_LIST();

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onDragStart = (event: React.DragEvent, nodeType: NodeInterface) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const jsonType = JSON.parse(type) as NodeInterface
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newId = uuidv7();

            const newNode = {
                id: newId,
                type: jsonType.type,
                position,
                data: {
                    label: jsonType.label,
                },
                ...(jsonType.width && { width: jsonType.width }),
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [setNodes, screenToFlowPosition],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {/* Sidebar */}
            <div className="fixed z-10 w-80 h-full bg-white border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Available Nodes</h2>
                <div className="flex flex-col gap-2">
                    {Object.values(nodeCategories).map((category) => (
                        <div key={category.key} className='flex flex-col gap-2'>
                            <h3 className="text-sm font-medium text-gray-700">{category.label}</h3>
                            <div className="flex flex-col gap-2">
                                {category.nodes.map((node) => {
                                    return (
                                        <div
                                            key={node.description}
                                            className="p-3 bg-gray-50 rounded-lg border border-primary-border cursor-move hover:bg-primary-hover transition-colors"
                                            draggable
                                            onDragStart={(event) => onDragStart(event, node)}
                                        >
                                            <div className="flex items-center space-x-3 gap-2">
                                                <div className="p-2 bg-blue-100 rounded-md">
                                                    <DynamicIcon name={node.icon} className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">{node.label}</div>
                                                    <div className="text-xs text-gray-500">{node.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Flow Canvas */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
            >
                <Background
                    size={10}
                    gap={50}
                    color="#a5daf5"
                />
            </ReactFlow>
        </div >
    );
}

export default AIComponentPageWrapper;