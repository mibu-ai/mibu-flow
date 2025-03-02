import { useCallback, useState, useRef, useEffect } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background, useReactFlow, ReactFlowProvider, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from '../components/Sidebar';
import Automate from '../components/Automate';
import HomeElement from '../components/HomeElement';
import FlowBar from '../components/FlowBar';
import Footer from '../components/Footer';
import { DnDProvider, useDnD } from '../context/DnDContext';

import InputText from '../components/nodes/input/InputText';
import ProcessTextConcat from '../components/nodes/process/ProcessTextConcat';
import OutputText from '../components/nodes/output/OutputText';
import BankFile from '../components/nodes/input/BankFIle';
import Ai from '../components/nodes/process/Ai';
import SaveTxt from '../components/nodes/output/SaveTxt';
// run: ready for the process to run, done: process has finished running.
const initialNodes = [
    { id: 'in-1', type: 'inputText', position: { x: 100, y: 100 }, data: {} },
    { id: 'in-2', type: 'inputText', position: { x: 100, y: 300 }, data: {} },
    { id: 'proc-1', type: 'processTextConcat', position: { x: 500, y: 150 }, data: { run: false, done: false } },
    { id: 'proc-2', type: 'processTextConcat', position: { x: 500, y: 500 }, data: { run: false, done: false } },
    { id: 'out-1', type: 'outputText', position: { x: 900, y: 150 }, data: {} },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialEdges = [
    { id: 'e1-3', source: 'in-1', targetHandle: 'a', target: 'proc-1', data: { done: false } },
    { id: 'e2-3', source: 'in-2', targetHandle: 'b', target: 'proc-1', data: { done: false } },
    { id: 'e23-3', source: 'proc-1', target: 'proc-2', data: { done: false } },
    { id: 'e3-4', source: 'proc-2', target: 'out-1', data: { done: false } },
];



const nodeTypes = {
    inputText: InputText,
    processTextConcat: ProcessTextConcat,
    outputText: OutputText,
    fileInput: BankFile,
    ai: Ai,
    saveTxt: SaveTxt,
};

const flowKey = 'example-flow';

function EditorChild() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { screenToFlowPosition, setViewport} = useReactFlow();
    const [type] = useDnD();

    useEffect(() => {
        console.log('Edges:', edges);
    }, [edges]);

    const onSave = useCallback(() => {
        if (rfInstance) {
          const flow = rfInstance.toObject();
          localStorage.setItem(flowKey, JSON.stringify(flow));
        }
      }, [rfInstance]);

    const onRestore = useCallback(() => {
    const restoreFlow = async () => {
        const flow = JSON.parse(localStorage.getItem(flowKey));
    
        if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        }
    };
     
    restoreFlow();
    }, [setNodes, setViewport]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => {
            const sourceNode = nodes.find(node => node.id === params.source);
            const newEdge = {
                ...params,
                data: { ...params.data, ...sourceNode?.data, markerEnd: { type: 'arrow' } },
            };
            return addEdge(newEdge, eds);
        });
    }, [setEdges, nodes]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes, type],
    );

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

                <FlowBar onClick={onSave} />

                <div className='flex flex-grow justify-end'>
                    <Automate onClick={runComputation} onClick2={onRestore}/>
                </div>

            </div>

            <Sidebar />
            <div className="w-full h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    onInit={setRfInstance}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
            <Footer />

        </div>
    );
}

export default function Editor() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <EditorChild />
            </DnDProvider>
        </ReactFlowProvider>
    );
}