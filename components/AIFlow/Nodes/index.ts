import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
// import PositionLoggerNode, {
//     type PositionLoggerNode as PositionLoggerNodeType,
// } from "./PositionLoggerNode";
import { TriggerNodeComponent } from "./triggerNode";
import { DocumentNodeComponent, DocumentNodeData } from "./documentNode";
import { AiAnalyzeNodeComponent, AiAnalyzeNodeData } from "./aiAnalyzeNode";
import { DecisionNodeComponent, DecisionNodeData } from "./decisionNode";
import { ExtractDocumentNodeComponent, ExtractDocumentNodeData } from "./extractDocumentNode";
import { AIDecisionNodeComponent, AIDecisionNodeData } from "./aiDecisionNode";
import { ActionNodeComponent, ActionNodeData } from "./actionNode";

export const initialNodes = [
    {
        id: "initialTrigger",
        position: { x: 0, y: 0 },
        type: "trigger",
        data: {
            label: 'Start',
            status: 'idle',
            execute: null,
            output: null,
            input: null
        }
    },
    {
        id: "initialDocumentSelection",
        position: { x: -30, y: 250 },
        type: "document",
        data: {
            selectedDocument: null,
            output: null,
            input: null,
            status: 'idle',
            execute: null,
            label: 'Document Selection'
        },
        width: 300
    }
] satisfies Node[];

export type CustomType = "group" | "input" | "output" | "default" | "trigger" | "document" | "ai-analyze" | "decision" | "extract-document" | "ai-decision" | "action";

export const nodeTypes = {
    "trigger": TriggerNodeComponent,
    "document": DocumentNodeComponent,
    "ai-analyze": AiAnalyzeNodeComponent,
    "decision": DecisionNodeComponent,
    "extract-document": ExtractDocumentNodeComponent,
    "ai-decision": AIDecisionNodeComponent,
    "action": ActionNodeComponent,
} satisfies NodeTypes;

export type BaseNodeData = {
    label: string;
    status: string;
    execute: (() => Promise<null | Error>) | null;
    output: any;
    input: any;
}

// Append the types of you custom edges to the BuiltInNode type
// export type CustomNodeType = Omit<BuiltInNode, 'type' | 'data'> & {
//     type: CustomType;
//     data: BaseNodeData;
// } 

export type CustomNodeType = BuiltInNode & BaseNodeData | DocumentNodeData | DecisionNodeData | AiAnalyzeNodeData | ExtractDocumentNodeData | AIDecisionNodeData | ActionNodeData