import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RunBtn from "./buttons/RunBtn";
import RestoreBtn from "./buttons/RestoreBtn";
import SignInBtn from "./buttons/SignInBtn";
import SignUpBtn from "./buttons/SignUpBtn";

const Automate = ({ onClick, onClick2 }) => {
    const [isSignedInPage, setIsSignedInPage] = useState(false);
    useEffect(() => {
        window.location.pathname === "/" ? setIsSignedInPage(true) : setIsSignedInPage(false);
    }, [isSignedInPage]);

    return (
        <>
            <div className="shadow-lg h-16 bg-white w-[300px] rounded-2xl border-2 text-custom-blue font-Poppins font-medium border-custom-border flex items-center justify-center text-left">
                { isSignedInPage ? <SignUpBtn/>: <RestoreBtn onClick={onClick2}/>}
                <div className="h-10 w-[2px] bg-custom-border mx-2"></div>
                { isSignedInPage ? <SignInBtn/> : <RunBtn onClick={onClick}/> }
            </div>
        </>
    );
};

Automate.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Automate;