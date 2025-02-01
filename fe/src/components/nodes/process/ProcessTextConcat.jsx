import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

const ProcessTextConcat = ({ id, data }) => {
    const { updateNodeData } = useReactFlow();
    const { getNode, getEdges } = useReactFlow();
    const [inputTexts, setInputTexts] = useState([]);
    const [outputText, setOutputText] = useState('');

    useEffect(() => {
        if (data.run) {
            const incomingEdges = getEdges().filter((edge) => edge.target === id);
            const connectedNodes = incomingEdges.map((edge) => getNode(edge.source));

            const newInputTexts = connectedNodes.map((node) => node.data.text || '');
            setInputTexts(newInputTexts);
            setOutputText(newInputTexts.join(' '));
            updateNodeData(id, { run: false, text: newInputTexts.join(' ') });
        }
    }, [data.run]);

    return (
        <div className="p-4 bg-gray-100 border rounded shadow">
            <div className="font-bold">Process Text Concat Node</div>
            <p className="mt-2">Inputs: {inputTexts.join(' + ')}</p>
            <p className="font-bold">Output: {outputText}</p>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default ProcessTextConcat;
