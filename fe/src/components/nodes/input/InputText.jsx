import React, { useState, memo } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { use } from 'react';

const InputText = ({ id, data }) => {
    const { updateNodeData, getEdges, updateEdgeData } = useReactFlow();
    const outEdges = getEdges().filter(edge => edge.source === id);

    const updateAllEdges = ( text ) => {
        outEdges.map(edge => {
            updateEdgeData(edge.id, { ...edge.data, text: text, done: true });
        })
    }

    return (
        <div className="p-4 bg-white border rounded shadow">
            <div className="font-bold">Input Text Node</div>
            <input
                type="text"
                value={data.text}
                onChange={(e) => {updateNodeData(id, { run: false, text: e.target.value, done: true }), updateAllEdges(e.target.value)}}
                className="border p-1 mt-2 w-full"
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default memo(InputText);
