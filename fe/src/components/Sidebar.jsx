import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDnD } from '../context/DnDContext';

export default function Sidebar() {
    const [_, setType] = useDnD();
    const [isOpen, setIsOpen] = useState(false);

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? 20 : '-100%' }}
            transition={{ duration: 0.25 }}
            className="flex flex-col w-96 h-screen fixed top-0 left-0 z-10 items-center justify-center"
        >
            <div className='flex relative w-full h-5/6 bg-white rounded-xl border border-custom-border shadow-lg'>
                <div className="p-4">
                    <div className='w-[350px] flex justify-center items-center gap-4'>

                        <div className='flex flex-col w-full gap-4'>
                            <div className='flex w-full'>
                                <input className="w-full text-custom-gray px-3 py-1 rounded-lg border border-2" placeholder='search' type="Search" />
                                <p className='hover:opacity-[80%] active:opacity-[60%] text-custom-gray text-xl'>x</p>
                            </div>

                            <div className="text-2xl font-bold">Nodes</div>
                            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'inputText')} draggable>
                                Input Node
                            </div>
                            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'processTextConcat')} draggable>
                                Default Node
                            </div>
                            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'outputText')} draggable>
                                Output Node
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex h-24 absolute top-1/2 left-96 transform -translate-y-1/2 bg-gray-50 text-black p-2 items-center justify-center rounded-2xl">
                    <button
                        onClick={toggleSidebar}
                        className="flex bg-blue-300 text-white rounded-r-xl h-20 w-5 items-center justify-center"
                    >
                        {isOpen ? '<' : '>'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
