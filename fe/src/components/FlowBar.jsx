import ShareBtn from "./buttons/ShareBtn";
const FlowBar = () => {
    return (
        <>
            <div className='shadow-lg bg-white w-[480px] h-16 rounded-2xl border-2 text-[#747474] font-Poppins font-medium border-border-gray flex items-center justify-center text-left'>
                <div className="flex w-[150px] ml-4">
                    <h2 className="">Your Mibu Flow</h2>
                    <svg className="ml-2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5623 4.81309L16.0372 7.28796M11.375 18.375H18.375M2.625 18.3754L2.66652 18.0848C2.81344 17.0563 2.8869 16.5421 3.054 16.0619C3.20228 15.636 3.40483 15.2309 3.65668 14.8566C3.94048 14.4349 4.30779 14.0676 5.0424 13.333L15.2344 3.14098C15.9178 2.45757 17.0258 2.45756 17.7093 3.14098C18.3927 3.8244 18.3927 4.93244 17.7093 5.61585L7.33026 15.9948C6.66382 16.6613 6.3306 16.9945 5.95105 17.2596C5.61416 17.4948 5.25081 17.6896 4.86848 17.8401C4.43775 18.0096 3.97578 18.1028 3.05194 18.2893L2.625 18.3754Z" stroke="#4B4B4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="h-10 w-[2px] bg-border-gray mx-4 ml-36"></div>
                <div className="w-[140px]">
                    <ShareBtn />
                </div>
            </div>
        </>
    );
};

export default FlowBar;