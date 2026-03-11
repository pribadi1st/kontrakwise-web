"use client"
import { useCallback } from 'react';
import {
    ReactFlow, applyNodeChanges, applyEdgeChanges,
    addEdge, Background, useReactFlow, ReactFlowProvider,
    useNodesState, useEdgesState, Connection,
    MarkerType,
} from '@xyflow/react';
import { NODE_LIST, NodeInterface } from './Drawer/constant';
import { uuidv7 } from 'uuidv7';
import { initialEdges, edgeTypes } from './Edges';
import { DynamicIcon } from 'lucide-react/dynamic';
import '@xyflow/react/dist/style.css';
import { CustomNodeType, initialNodes, nodeTypes } from './Nodes';
import { Button } from '../ui/button';
import { Play } from 'lucide-react'
import { toast } from 'sonner';
import { errorToast } from '@/utils/functionHelper/toastHelper';

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
        // Find the trigger node (start point)
        const triggerNode = nodes.find(n => n.type === 'trigger');
        if (!triggerNode) {
            errorToast('No trigger starting point found')
            return;
        }

        // Get connected nodes from trigger
        const connectedEdges = edges.filter(e => e.source === triggerNode.id);

        if (connectedEdges.length === 0) {
            errorToast('No nodes connected to trigger')
            return;
        }

        // Execute the workflow step by step - traverse the entire graph
        console.log("Starting workflow execution...")
        let nodesToProcess = connectedEdges.map(edge => nodes.find(n => n.id === edge.target)).filter(Boolean);

        while (nodesToProcess.length > 0) {
            const currentNode = nodesToProcess.shift()!;
            if (!currentNode) continue;

            // Find outgoing edges from this node first to determine connections
            let outputEdges = edges.filter(e => e.source === currentNode.id);

            // Check if node has execute method and call it
            if (currentNode.data && 'execute' in currentNode.data && currentNode.data.execute) {
                try {
                    const result = await (currentNode.data.execute as () => Promise<null | Error>)();

                    if (result instanceof Error) {
                        errorToast(`Node ${currentNode.id} execution failed: ${result.message}`)
                        continue;
                    }

                    // For decision nodes, filter edges based on decision result
                    if (currentNode.type === 'decision' || currentNode.type === 'ai-decision') {
                        const decisionResult = (result as any)?.decision as string;
                        const targetHandle = decisionResult ? 'decision-true' : 'decision-false';
                        outputEdges = outputEdges.filter(e => e.sourceHandle === targetHandle);
                    }

                    // Pass output to connected nodes and add them to processing queue
                    for (const outputEdge of outputEdges) {
                        const nextNode = nodes.find(n => n.id === outputEdge.target);
                        if (nextNode) {
                            console.log("============")
                            console.log("has result")
                            console.log("result", result)
                            console.log("============")
                            if (result) {
                                // Update the node data immediately
                                updateNodeData(nextNode.id, { input: result });

                                // Add a small delay to ensure React Flow processes the state update
                                await new Promise(resolve => setTimeout(resolve, 100));

                                // Get the updated node data to ensure input is set
                                const updatedNode = nodes.find(n => n.id === nextNode.id);
                                if (updatedNode && updatedNode.data.input) {
                                    console.log("Input successfully passed to node:", nextNode.id);
                                } else {
                                    console.warn("Failed to pass input to node:", nextNode.id);
                                }
                            }

                            // Add to processing queue if not already there
                            if (!nodesToProcess.some(n => n.id === nextNode.id)) {
                                nodesToProcess.push(nextNode);
                            }
                        }
                    }
                    console.log(currentNode)
                } catch (error) {
                    errorToast(`Error in ${currentNode.type} node`)
                }
            } else {
                console.log(`Node ${currentNode.type} (${currentNode.id}) has no execute method`);
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
                // Create new edge - you can choose 'default' (solid) or 'dashed' (dashed)
                const newEdge = {
                    ...params,
                    id: `${params.source}-${params.target}-${Date.now()}`,
                    type: 'normal', // Use 'dashed' for dashed, 'default' for solid
                };


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

                    if (sourceNode?.type.includes('decision')) {
                        newEdge.type = 'dashed-arrow'
                    }
                }

                const newEdges = addEdge(newEdge, edgesSnapshot);

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
                    label: jsonType.label,
                    status: 'idle',
                    execute: null,
                    output: null,
                    input: null,
                    // Add default values for AI Decision nodes
                    ...(jsonType.type === 'ai-decision' && {
                        conditionType: 'risk_score',
                        conditionConfig: {
                            operator: 'gt',
                            value: 5,
                            riskLevel: 'Medium',
                            ruleName: ''
                        },
                        trueLabel: 'True',
                        falseLabel: 'False',
                        description: ''
                    }),
                    // Add default values for Action nodes
                    ...(jsonType.type === 'action' && {
                        actionType: 'manual_review',
                        actionConfig: {
                            message: '',
                            recipients: [],
                            priority: 'medium',
                            assignee: '',
                            dueDate: '',
                            tags: []
                        },
                        description: ''
                    })
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
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                defaultEdgeOptions={{
                    style: { strokeWidth: 2, stroke: '#b1b1b7' },
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: '#b1b1b7',
                    },
                }}
                connectionLineStyle={{ stroke: '#b1b1b7', strokeWidth: 2 }}
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