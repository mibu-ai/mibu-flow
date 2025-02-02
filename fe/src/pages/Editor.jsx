import { useCallback, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from '../components/Sidebar';
import Automate from '../components/Automate';
import HomeElement from '../components/HomeElement';
import FlowBar from '../components/FlowBar';
import Footer from '../components/Footer';

import InputText from '../components/nodes/input/InputText';
import ProcessTextConcat from '../components/nodes/process/ProcessTextConcat';
import OutputText from '../components/nodes/output/OutputText';

// run: ready for the process to run, done: process has finished running.
const initialNodes = [
    { id: 'in-1', type: 'inputText', position: { x: 100, y: 100 }, data: {} },
    { id: 'in-2', type: 'inputText', position: { x: 100, y: 300 }, data: {} },
    { id: 'in-3', type: 'inputText', position: { x: 100, y: 500 }, data: {} },
    { id: 'proc-1', type: 'processTextConcat', position: { x: 500, y: 150 }, data: { run: false, done: false } },
    { id: 'proc-2', type: 'processTextConcat', position: { x: 500, y: 500 }, data: { run: false, done: false } },
    { id: 'out-1', type: 'outputText', position: { x: 900, y: 150 }, data: {} },
];

const initialEdges = [
    { id: 'e1-3', source: 'in-1', targetHandle: 'a', target: 'proc-1' },
    { id: 'e2-3', source: 'in-2', targetHandle: 'b', target: 'proc-1' },
    { id: 'e23-3', source: 'proc-1', target: 'proc-2' },
    { id: 'e3-4', source: 'proc-2', target: 'out-1' },
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
        console.log('Running computation');
        setNodes((nds) =>
            nds.map((node) => {
            if (node.type.includes('process')) {
                return {
                ...node,
                data: { ...node.data, run: true },
                };
            }
            return node;
            })
        );
    };

    return (
        <div className="relative w-screen h-screen">
            <div className='flex flex-row absolute w-full pt-4 px-4 z-10'>
                <HomeElement />

                <div className='px-3' />

                <FlowBar />

                <div className='flex flex-grow justify-end'>
                    <Automate onClick={runComputation} />
                </div>

            </div>

            <Sidebar />

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
            <Footer />

        </div>
    );
}
