import React, { useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useHandleConnections, useNodesData } from '@xyflow/react';
import { use } from 'react';

const OutputText = ({ id, data }) => {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData = useNodesData(connections[0]?.source || []);

    useEffect(() => {
        if (connections.length) {
            const inputTexts = nodesData.data.text;
            updateNodeData(id, { text: inputTexts });
        }
    }, [connections, nodesData]);

    return (
        <div className="p-4 bg-blue-100 border rounded shadow">
            <div className="font-bold">Output Text Node</div>
            <p className="mt-2">Output: {data.text || 'No Output'}</p>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default OutputText;
