import { Link } from 'react-router-dom';

const GetStartedBtn = () => {
    return (
        <>
            <Link to="/signin">
                <button className="active:opacity-[100%] hover:opacity-[80%] font-harabara text-custom-blue mt-8 bg-white text-[20px] border border-[2px] border-custom-border py-3 px-8 rounded-2xl">
                    <h2>Get Started</h2>    
                </button>
            </Link>
        </>
    );
};

export default GetStartedBtn;