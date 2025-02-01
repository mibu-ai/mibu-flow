import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RunBtn from "./buttons/RunBtn";
import SignInBtn from "./buttons/SignInBtn";

const Automate = ({ onClick }) => {
    const [isSignedInPage, setIsSignedInPage] = useState(false);
    useEffect(() => {
        window.location.pathname === "/" ? setIsSignedInPage(true) : setIsSignedInPage(false);
    }, [isSignedInPage]);

    return (
        <>
            <div className="shadow-lg h-16 bg-white w-[300px] rounded-2xl border-2 text-custom-blue font-Poppins font-medium border-border-gray flex items-center justify-center text-left">
                <h1></h1>
                <div className="w-px h-10 w-[2px] bg-border-gray mx-4 ml-32"></div>
                { isSignedInPage ? <SignInBtn/> : <RunBtn onClick={onClick}/> }
            </div>
        </>
    );
};

Automate.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Automate;