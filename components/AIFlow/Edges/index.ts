import { BuiltInEdge, EdgeTypes } from '@xyflow/react';
import { DashedEdge } from './DashedEdge'
import DefaultEdge from './DefaultEdge';

export const initialEdges = [{
    id: 'initialEdges',
    source: 'initialTrigger',
    target: 'initialDocumentSelection',
    type: 'normal'
}]

export const edgeTypes = {
    "dashed-arrow": DashedEdge,
    'normal': DefaultEdge
} satisfies EdgeTypes

export type CustomEdgeType = BuiltInEdge   