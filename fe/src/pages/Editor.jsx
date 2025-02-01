import React, { useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Sidebar } from '../components/Sidebar';

const initialNodes = [
    { id: '1', position: { x: 500, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 500, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Editor() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="relative" style={{ width: '100vw', height: '100vh' }}>
            <Sidebar />

            <ReactFlow
                nodes={nodes}
                edges={edges}
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
