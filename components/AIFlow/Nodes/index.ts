import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
// import PositionLoggerNode, {
//     type PositionLoggerNode as PositionLoggerNodeType,
// } from "./PositionLoggerNode";
import { TriggerNodeComponent } from "./triggerNode";
import { DocumentNodeComponent, DocumentNodeData } from "./documentNode";
import { AiAnalyzeNodeComponent, AiAnalyzeNodeData } from "./aiAnalyzeNode";
import { DecisionNodeComponent, DecisionNodeData } from "./decisionNode";
import { ExtractDocumentNodeComponent, ExtractDocumentNodeData } from "./extractDocumentNode";

export const initialNodes = [
    {
        id: "initialTrigger",
        position: { x: 0, y: 0 },
        type: "trigger",
        data: {
            label: 'Start'
        }
    },
    {
        id: "initialDocumentSelection",
        position: { x: -30, y: 250 },
        type: "document",
        data: {
            selectedDocument: null,
            output: null
        },
        width: 300
    }
] satisfies Node[];

export type CustomType = "group" | "input" | "output" | "default" | "trigger" | "document" | "ai-analyze" | "decision" | "extract-document";

export const nodeTypes = {
    "trigger": TriggerNodeComponent,
    "document": DocumentNodeComponent,
    "ai-analyze": AiAnalyzeNodeComponent,
    "decision": DecisionNodeComponent,
    "extract-document": ExtractDocumentNodeComponent,
} satisfies NodeTypes;

export type BaseNodeData = {
    label: string;
    status: string;
    execute: () => Promise<null | Error>;
    output: any
}

// Append the types of you custom edges to the BuiltInNode type
// export type CustomNodeType = Omit<BuiltInNode, 'type' | 'data'> & {
//     type: CustomType;
//     data: BaseNodeData;
// } 

export type CustomNodeType = BuiltInNode & BaseNodeData | DocumentNodeData | DecisionNodeData | AiAnalyzeNodeData | ExtractDocumentNodeData