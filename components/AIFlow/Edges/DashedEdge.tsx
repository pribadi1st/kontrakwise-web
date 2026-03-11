import { BaseEdge, EdgeProps, getBezierPath, MarkerType } from '@xyflow/react';

function DashedEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // Custom edge is always dashed
    const defaultStyle = {
        strokeWidth: 2,
        stroke: '#b1b1b7',
        strokeDasharray: '5,5', // Always dashed for custom edge
        ...style,
    };

    return (
        <>
            <path
                id={id}
                style={defaultStyle}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd || MarkerType.ArrowClosed
                }
            />
        </>
    );
}

export { DashedEdge }