import React from 'react';
import { Handle, Position } from '@xyflow/react';

const OutputText = ({ id, data }) => {
    return (
        <div className="p-4 bg-blue-100 border rounded shadow">
            <div className="font-bold">Output Text Node</div>
            <p className="mt-2">Output: {data.output || 'No Output'}</p>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default OutputText;
