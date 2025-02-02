import { useEffect, useState } from 'react';

export default function Dashboard() {

    const [flowName, setFlowName] = useState('');

    useEffect(() => {
        const storedFlowName = localStorage.getItem('flowName');
        if (storedFlowName) {
            setFlowName(storedFlowName);
        }
    }, []);
    const handleButton = () => {
        window.location.href = '/edit';
    }
    return (
        <div className="h-screen w-screen bg-custom-bg bg-cover bg-center flex flex-col items-center justify-center">
            <div className='flex justify-center'>
                <div className='absolute bottom-0 w-[80%] h-[90%] bg-white rounded-tr-xl rounded-tl-xl border-2 border-custom-blue shadows-lg'>
                     <h1 className= "font-harabara text-custom-blue text-[40px] pl-8 pt-8 ">Your Personal Mibu Flows (★‿★)</h1>
                     <button className="text-[24px] text-custom-blue pl-8 font-bold w-full border border-custom-border py-8 mt-4" onClick={handleButton}>Recent project: {flowName}</button>
                </div>
                
            </div>
        </div>
    )
}
