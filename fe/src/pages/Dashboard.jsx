import { useEffect, useState } from "react";

export default function Dashboard() {
    
    const [flowsArray, setFlowsArray] = useState([]);

    useEffect(() => {
        localStorage.getItem('')
        .then((response) => response.json())
        .then((data) => {
            setFlowsArray(data);
        });
    }, []);

    return (
        <div className="h-screen w-screen bg-custom-bg bg-cover bg-center flex flex-col items-center justify-center">
            <div className='flex justify-center'>
                <div className='absolute bottom-0 w-[80%] h-[90%] bg-white rounded-tr-xl rounded-tl-xl border-2 border-custom-blue shadows-lg'>
                     <h1 className= "font-harabara text-custom-blue text-[40px] pl-8 pt-8 ">Your Personal Mibu Flows (★‿★)</h1>
                </div>
            </div>
        </div>
    )
}
