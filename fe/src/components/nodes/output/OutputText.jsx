import React, { useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useHandleConnections, useNodesData } from '@xyflow/react';
import { use } from 'react';

const OutputText = ({ id, data }) => {
    const connections = useNodeConnections({
        type: 'target',
    });
    const nodesData = useNodesData((connections || []).map((c) => c.source));
    const { updateNodeData, getEdges, updateEdgeData } = useReactFlow();
    const inEdges = getEdges().filter(edge => edge.target === id);

    useEffect(() => {
        if (inEdges.length) {
            const inputTexts = inEdges[0].data.text;

            // console.log('Input Texts:', inputTexts);

            updateNodeData(id, { text: inputTexts });
        }
    }, [inEdges, nodesData]);

    return (
        <div className="p-4 bg-blue-100 border rounded shadow">
            <div className="font-bold">Output Text Node</div>
            <p className="mt-2">Output: {data.text || 'No Output'}</p>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default OutputText;
