import ShareBtn from "./buttons/ShareBtn";
import { useState, useEffect, useRef } from "react";

const FlowBar = ({ onClick }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputValueRef = useRef();

    const handleSvgClick = () => {
        setIsEditable(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        // Set initial value from localStorage or default
        const savedFlowName = localStorage.getItem('flowName') || 'Untitled Flow';
        setInputValue(savedFlowName);
        inputValueRef.current = savedFlowName;
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                setIsEditable(false);
                localStorage.setItem('flowName', inputValueRef.current);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // Keep the ref synchronized with the latest state
    useEffect(() => {
        inputValueRef.current = inputValue;
    }, [inputValue]);

    return (
        <>
            <div className="shadow-lg bg-white w-[480px] h-16 rounded-2xl border-2 text-[#2b2b2b] font-Poppins font-medium border-custom-border flex items-center justify-center text-left">
                <div className="flex w-[150px] ml-4">
                    {isEditable ? (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="border-none outline-none"
                        />
                    ) : (
                        <h2>{inputValue}</h2>
                    )}
                    <svg
                        className="ml-2 cursor-pointer"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleSvgClick}
                    >
                        <path
                            d="M13.5623 4.81309L16.0372 7.28796M11.375 18.375H18.375M2.625 18.3754L2.66652 18.0848C2.81344 17.0563 2.8869 16.5421 3.054 16.0619C3.20228 15.636 3.40483 15.2309 3.65668 14.8566C3.94048 14.4349 4.30779 14.0676 5.0424 13.333L15.2344 3.14098C15.9178 2.45757 17.0258 2.45756 17.7093 3.14098C18.3927 3.8244 18.3927 4.93244 17.7093 5.61585L7.33026 15.9948C6.66382 16.6613 6.3306 16.9945 5.95105 17.2596C5.61416 17.4948 5.25081 17.6896 4.86848 17.8401C4.43775 18.0096 3.97578 18.1028 3.05194 18.2893L2.625 18.3754Z"
                            stroke="#4B4B4B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="h-10 w-[2px] bg-custom-border mx-4 ml-36"></div>
                <div className="w-[170px]">
                    <ShareBtn onClick={onClick}/>
                </div>
            </div>
        </>
    );
};

export default FlowBar;
