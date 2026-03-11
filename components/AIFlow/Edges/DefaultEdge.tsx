import { EdgeProps, getBezierPath, MarkerType } from '@xyflow/react';

export default function DefaultEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // Default edge is solid (no dash)
    const defaultStyle = {
        strokeWidth: 2,
        stroke: '#b1b1b7',
        strokeDasharray: 'none', // Solid line for default edge
        ...style,
    };

    return (
        <>
            <path
                id={id}
                style={defaultStyle}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd || MarkerType.ArrowClosed}
            />
        </>
    );
}
