import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDnD } from '../context/DnDContext';

export default function Sidebar() {
    const [, setType] = useDnD();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const dragNode = (title, var_name) => {
        console.log('dragging node');
        
        return (
            <div className="dndnode" onDragStart={(event) => onDragStart(event, var_name)} draggable>
                {title}
            </div>
        );
    };

    const nodes = [
        { title: 'Input Node', var_name: 'inputText' },
        { title: 'Text Concatenation Node', var_name: 'processTextConcat' },
        { title: 'Output Node', var_name: 'outputText' },
        { title: 'Bank File Node', var_name: 'fileInput' },
    ];

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
                                <input 
                                    className="w-full text-custom-gray px-3 py-1 rounded-lg border border-2" placeholder='search' type="Search" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="text-2xl font-bold">Nodes</div>
                            
                            <div className='flex flex-col gap-4'>
                                {nodes
                                    .filter((node) => 
                                        node.title.toLowerCase().includes(search.toLowerCase()) || 
                                        node.var_name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((node) => dragNode(node.title, node.var_name))}
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
