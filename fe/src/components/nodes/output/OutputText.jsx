import React, { useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useNodesData } from '@xyflow/react';

const OutputText = ({ id, data }) => {
    const connections = useNodeConnections({
            type: 'target',
        });
    const nodesData = useNodesData((connections || []).map((c) => c.source));
    const { updateNodeData, getEdges, updateEdgeData } = useReactFlow();
    const inEdges = getEdges().filter(edge => edge.target === id);

    console.log('Output Text Node:', id);

    useEffect(() => {
        const allDone = inEdges.every((edge) => edge?.data?.done);
        console.log("in edges", inEdges, "all done", allDone);
        if (!allDone) return;

        if (inEdges.length) {
            const inputTexts = inEdges[0].data.text;
            updateNodeData(id, { ...data, text: inputTexts });
        }
    }, [data.run, nodesData]);

    return (
        <div className="p-4 bg-blue-100 border rounded shadow">
            <div className="font-bold">Output Text Node</div>
            <p className="mt-2">Output: {data.text || 'No Output'}</p>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default OutputText;
