import { useEffect, useState } from "react";
import RunBtn from "./buttons/RunBtn";
import SignInBtn from "./buttons/SignInBtn";

const Automate = () => {
    const [isSignedInPage, setIsSignedInPage] = useState(false);
    useEffect(() => {
        window.location.pathname === "/" ? setIsSignedInPage(true) : setIsSignedInPage(false) ;
    }, [isSignedInPage]);

    return (
        <>
            <div className="shadow-lg h-16 w-[300px] rounded-2xl border-2 text-custom-blue font-Poppins font-medium border-custom-blue flex items-center justify-center text-left">
                <h1></h1>
                <div className="w-px h-10 w-[2px] bg-border-gray mx-4 ml-32"></div>
                { isSignedInPage ? <SignInBtn/> : <RunBtn /> }
            </div>
        </>
    );
};

export default Automate;