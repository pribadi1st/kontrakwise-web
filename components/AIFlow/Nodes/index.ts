import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
// import PositionLoggerNode, {
//     type PositionLoggerNode as PositionLoggerNodeType,
// } from "./PositionLoggerNode";
import { TriggerNodeComponent } from "./triggerNode";
import { DocumentNodeComponent } from "./documentNode";
import { AiAnalyzeNodeComponent } from "./aiAnalyzeNode";
import { DecisionNodeComponent } from "./decisionNode";

export const initialNodes = [] satisfies Node[];

export type CustomType = "group" | "input" | "output" | "default" | "trigger" | "document" | "ai-analyze" | "decision";

export const nodeTypes = {
    "trigger": TriggerNodeComponent,
    "document": DocumentNodeComponent,
    "ai-analyze": AiAnalyzeNodeComponent,
    "decision": DecisionNodeComponent,
} satisfies NodeTypes;

// Append the types of you custom edges to the BuiltInNode type
export type CustomNodeType = Omit<BuiltInNode, 'type'> & {
    type: CustomType;
} 