import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useHandleConnections, useNodesData } from '@xyflow/react';
import { use } from 'react';

const ProcessTextConcat = ({ id, data }) => {
    const { updateNodeData } = useReactFlow();
    const connections = useHandleConnections({
        type: 'target',
    });
    const nodesData = useNodesData((connections || []).map((c) => c.source));

    useEffect(() => {
        const allDone = nodesData.every((node) => node.data.done);
        if (!allDone) return;

        if (connections.length && data.run) {
            console.log('process id', id, ' is running: ', data.run);
            const inputTexts = nodesData.map((node) => node.data.text);
            const outputText = inputTexts.join('');

            updateNodeData(id, { run: false, text: outputText, done: true });

            setTimeout(() => {
                updateNodeData(id, { run: false, text: outputText, done: false });
            }, 200);
        }
    }, [data.run, nodesData]); 

    return (
        <div className="p-4 bg-gray-100 border rounded shadow">
            <div className="font-bold">Process Text Concat Node</div>
            <p className="font-bold">Output: {data.text}</p>
            <Handle id="a" type="target" position={Position.Left} style={{ top: '30%', transform: 'translateY(-50%)' }}/>
            <Handle id="b" type="target" position={Position.Left} style={{ top: '70%', transform: 'translateY(-50%)' }}/>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default ProcessTextConcat;
