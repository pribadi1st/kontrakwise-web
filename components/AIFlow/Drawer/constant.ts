import { IconName } from "lucide-react/dynamic";
import { CustomNodeType } from "../Nodes";


interface CategoryInterface {
    key: string;
    label: string;
    nodes: NodeInterface[];
}

export interface NodeInterface {
    type: string;
    label: string;
    icon: IconName;
    description: string;
    width?: number;
}

export function NODE_LIST() {
    const nodeCategories: Record<string, CategoryInterface> = {
        "trigger": {
            key: "trigger",
            label: "Trigger",
            nodes: [{
                type: 'trigger',
                label: 'Start Workflow',
                icon: "zap",
                description: 'Trigger workflow execution'
            }]
        },
        "ai_action": {
            key: "ai_action",
            label: "Ai Action",
            nodes: [
                {
                    type: 'ai-analyze',
                    label: 'AI Analyze',
                    icon: "brain",
                    description: 'Analyze documents with AI',
                    width: 300
                },
                {
                    type: 'default',
                    label: 'Rule base logic',
                    icon: "brain",
                    description: 'Give rules for the AI to follow'
                }
            ]
        },
        "data": {
            key: "data",
            label: "Data",
            nodes: [
                {
                    type: 'document',
                    label: 'Select Document',
                    icon: "file-text",
                    description: 'Select and process documents',
                    width: 300
                },
                {
                    type: 'extract-document',
                    label: 'Extract Information',
                    icon: "download",
                    description: 'Extract information from document',
                    width: 300
                }
            ]
        },
        "logical": {
            key: "logical",
            label: "Logical Operator",
            nodes: [
                {
                    type: 'decision',
                    label: 'Decision Tree',
                    icon: "split",
                    description: 'Make decisions based on conditions',
                    width: 300
                }
            ]
        }
    }

    return nodeCategories
}