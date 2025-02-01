import { useState } from 'react';
import { motion } from 'framer-motion';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? 0 : '-100%' }}
            transition={{ duration: 0.25 }}
            className="flex flex-col w-80 h-screen fixed top-0 left-0 z-10 items-center justify-center"
        >
            <div className='flex relative w-full h-5/6 bg-gray-50 rounded-xl'>
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Sidebar</h1>
                </div>

                <div className="flex h-24 absolute top-1/2 left-80 transform -translate-y-1/2 bg-gray-50 text-black p-2 items-center justify-center rounded-r-xl">
                    <button
                        onClick={toggleSidebar}
                        className="flex bg-blue-300 rounded-r-xl h-20 w-5 items-center justify-center"
                    >
                        {isOpen ? '-' : '+'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
