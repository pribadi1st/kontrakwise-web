"use client"
import { useCallback } from 'react';
import {
    ReactFlow, applyNodeChanges, applyEdgeChanges,
    addEdge, Background, useReactFlow, ReactFlowProvider,
    useNodesState, useEdgesState, Connection,
} from '@xyflow/react';
import { NODE_LIST, NodeInterface } from './Drawer/constant';
import { uuidv7 } from 'uuidv7';
import { initialEdges } from './Edges';
import { DynamicIcon } from 'lucide-react/dynamic';
import '@xyflow/react/dist/style.css';
import { CustomNodeType, initialNodes, nodeTypes } from './Nodes';
import { Button } from '../ui/button';
import { Play } from 'lucide-react'
import { toast } from 'sonner';

function AIComponentPageWrapper() {
    return (
        <ReactFlowProvider>
            <AIComponentPage />
        </ReactFlowProvider>
    );
}

function AIComponentPage() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const { screenToFlowPosition, updateNodeData } = useReactFlow();
    const nodeCategories = NODE_LIST();

    const executeFlow = async () => {
        console.log('Executing flow...');
        console.log('Current nodes:', nodes);
        console.log('Current edges:', edges);

        // Find the trigger node (start point)
        const triggerNode = nodes.find(n => n.type === 'trigger');
        if (!triggerNode) {
            toast.error('No trigger starting point found', {
                style: {
                    backgroundColor: '#CB3A31',
                    color: '#ffffff',
                    borderColor: '#CB3A31',
                }
            });
            return;
        }

        // Get connected nodes from trigger
        const connectedEdges = edges.filter(e => e.source === triggerNode.id);

        if (connectedEdges.length === 0) {
            toast.error('No nodes connected to trigger', {
                style: {
                    backgroundColor: '#CB3A31',
                    color: '#ffffff',
                    borderColor: '#CB3A31',
                }
            });
            return;
        }

        // Execute the workflow step by step
        for (const edge of connectedEdges) {
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!targetNode) continue;

            // Check if node has execute method and call it
            if (targetNode.data && 'execute' in targetNode.data && targetNode.data.execute) {
                try {
                    console.log(`Executing node: ${targetNode.type} (${targetNode.id})`);
                    const result = await (targetNode.data as CustomNodeType).execute()

                    // Check if result is an Error object
                    if (result instanceof Error) {
                        console.error(`Node ${targetNode.id} returned an error:`, result);
                        toast.error(`Error in ${targetNode.type} node: ${result.message}`, {
                            style: {
                                backgroundColor: '#CB3A31',
                                color: '#ffffff',
                                borderColor: '#CB3A31',
                            }
                        });
                        break; // Stop the flow
                    }
                    if (!result) {
                        continue; // Stop the flow
                    }

                    // Find connected nodes and pass the result
                    const outputEdges = edges.filter(e => e.source === targetNode.id);
                    for (const outputEdge of outputEdges) {
                        const nextNode = nodes.find(n => n.id === outputEdge.target);
                        if (nextNode) {
                            updateNodeData(nextNode.id, { input: result });
                            console.log(`Passed output to ${nextNode.type} (${nextNode.id})`);
                        }
                    }
                } catch (error) {
                    console.error(`Error executing node ${targetNode.id}:`, error);
                    toast.error(`Error in ${targetNode.type} node`, {
                        style: {
                            backgroundColor: '#CB3A31',
                            color: '#ffffff',
                            borderColor: '#CB3A31',
                        }
                    });
                }
            } else {
                console.log(`Node ${targetNode.type} (${targetNode.id}) has no execute method`);
            }
        }

        console.log('Flow execution completed');
    };

    const onNodesChange = useCallback(
        (changes: any) => {
            setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
        },
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => {
            console.log("Connection made:", params);
            setEdges((edgesSnapshot) => {
                const newEdges = addEdge(params, edgesSnapshot);

                // Update target node with source node's output
                if (params.target && params.source) {
                    // Find the source node
                    const sourceNode = nodes.find(n => n.id === params.source);
                    console.log("Source node:", sourceNode);

                    if (sourceNode && 'output' in sourceNode.data && sourceNode.data.output) {
                        // Update the target node directly
                        updateNodeData(params.target, {
                            input: sourceNode.data.output
                        });
                    }
                }

                return newEdges;
            });
        },
        [nodes, updateNodeData],
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
                    input: null
                },
                ...(jsonType.width && { width: jsonType.width }),
            };
            setNodes((nds) => nds.concat(newNode as any));
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

            <Button
                onClick={executeFlow}
                className='fixed z-1 cursor-pointer bg-primary-surface text-primary border border-primary-border rounded-full p-4 z-1 hover:text-white'
                style={{
                    bottom: 30,
                    right: 20,
                }}
            >
                <Play size={10} />
                Run Flow
            </Button>
        </div >
    );
}

export default AIComponentPageWrapper;