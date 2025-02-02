import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useNodesData, useEdgesState } from '@xyflow/react';

const ProcessTextConcat = ({ id, data }) => {
    const [text, setText] = useState('');
    const { getNodes, updateNodeData, getEdges, updateEdgeData, setEdges, updateEdge } = useReactFlow();
    const nodes = getNodes();
    const inEdges = getEdges().filter(edge => edge.target === id);
    const outEdges = getEdges().filter(edge => edge.source === id);

    useEffect(() => {
        console.log('ProcessTextConcat was triggered as a result of edge change', id, data);
    }, [inEdges]);

    useEffect(() => {
        console.log('ProcessTextConcat', id, data, { inEdges });

        const allDone = inEdges.every((edge) => edge?.data?.done);
        console.log('allDone', allDone, { inEdges });
        if (!allDone) return;

        if (inEdges.length && data.run) {
            console.log('process id', id, ' is running: ', data.run);

            // set all incoming nodes done to false
            inEdges.map(edge => {
                // find the node with the id to be == edge.source
                const node = nodes.find(node => node.id === edge.source);
                if (!node.type.includes('input')) {
                    updateEdgeData(edge.id, { ...edge.data, done: false });
                }
            });

            // take incoming note data and concat them, then put it on all outgoing edges
            const text = inEdges.map(edge => edge.data.text).join('');
            updateNodeData(id, { run: false, text: text });

            outEdges.map(edge => {
                console.log('updating edge', edge.id, 'with text', text);

                // updateEdgeData(edge.id, { text: text, done: true });

                updateEdge(edge.id, {
                    ...edge,
                    data: { ...edge.data, text: text, done: true },
                });
            });

            // print the fixed edge
            console.log('fixed edge', getEdges().find(edge => edge.source === id));

            setText(text);
        }
    }, [data.run, inEdges]); 

    return (
        <div className="p-4 bg-gray-100 border rounded shadow">
            <div className="font-bold">Process Text Concat Node</div>
            <p className="font-bold">Output: {text}</p>
            <Handle id="a" type="target" position={Position.Left} style={{ top: '30%', transform: 'translateY(-50%)' }}/>
            <Handle id="b" type="target" position={Position.Left} style={{ top: '70%', transform: 'translateY(-50%)' }}/>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default ProcessTextConcat;
