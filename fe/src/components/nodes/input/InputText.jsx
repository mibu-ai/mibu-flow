import React, { useState, memo } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

const InputText = ({ id, data }) => {
    const { updateNodeData } = useReactFlow();

    return (
        <div className="p-4 bg-white border rounded shadow">
            <div className="font-bold">Input Text Node</div>
            <input
                type="text"
                value={data.text}
                onChange={(e) => updateNodeData(id, { text: e.target.value })}
                className="border p-1 mt-2 w-full"
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default memo(InputText);
