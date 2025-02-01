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
            transition={{ duration: 0.5 }}
            className="bg-white text-black w-80 h-5/6 flex flex-col fixed top-0 left-0 z-10 rounded-r-lg"
        >
            <div className="p-4">
                <h1 className="text-2xl font-bold">Sidebar</h1>
            </div>

            <button
                onClick={toggleSidebar}
                className="absolute top-4 right-[-40px] bg-white text-black p-2 rounded-full shadow-md"
            >
                {isOpen ? '←' : '→'}
            </button>
        </motion.div>
    );
}
