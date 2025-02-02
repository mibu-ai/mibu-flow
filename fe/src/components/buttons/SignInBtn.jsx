import { Link } from 'react-router-dom';

const SignInBtn = () => {
    return (
        <Link to="/signin">
            <div className="hover:cursor-pointer active:opacity-[80%] w-32 h-10 rounded-2xl font-semibold border-2 border-custom-border flex items-center justify-center shadow-lg select-none">
                <h2>Sign In</h2>
            </div>
        </Link>
    );
};

export default SignInBtn;
