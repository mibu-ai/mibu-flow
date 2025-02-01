import React, { useCallback, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from '../components/Sidebar';

import InputText from '../components/nodes/input/InputText';
import ProcessTextConcat from '../components/nodes/process/ProcessTextConcat';
import OutputText from '../components/nodes/output/OutputText';

const initialNodes = [
    { id: 'in-1', type: 'inputText', position: { x: 100, y: 100 }, data: { text: '' } },
    { id: 'in-2', type: 'inputText', position: { x: 100, y: 200 }, data: { text: '' } },
    { id: 'proc-1', type: 'processTextConcat', position: { x: 300, y: 150 }, data: { run: false } },
    { id: 'out-1', type: 'outputText', position: { x: 500, y: 150 }, data: { output: '' } },
];

const initialEdges = [
    { id: 'e1-3', source: 'in-1', target: 'proc-1' },
    { id: 'e2-3', source: 'in-2', target: 'proc-1' },
    { id: 'e3-4', source: 'proc-1', target: 'out-1' },
];

const nodeTypes = {
    inputText: InputText,
    processTextConcat: ProcessTextConcat,
    outputText: OutputText,
};

export default function Editor() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const runComputation = () => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.type === 'processTextConcat') {
                    return { ...node, data: { ...node.data, run: true } };
                }
                return node;
            })
        );

        setTimeout(() => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.type === 'outputText') {
                        const processNode = nds.find((n) => n.type === 'processTextConcat');
                        return { ...node, data: { ...node.data, output: processNode.data.text || '' } };
                    }
                    return node;
                })
            );
        }, 200);
    };

    return (
        <div className="relative w-screen h-screen">
            <Sidebar />

            {/* click to run button */}
            <button
                onClick={runComputation}
                className="absolute top-4 right-4 bg-blue-500 text-black px-4 py-2 rounded z-10"
            >
                run
            </button>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                style={{ width: '100%', height: '100%' }}
            >
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
