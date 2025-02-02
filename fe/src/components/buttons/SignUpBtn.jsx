import { Link } from 'react-router-dom';

const SignUpBtn = () => {
    return (
        <Link to="/signup">
            <div className="hover:cursor-pointer active:opacity-[80%] w-32 h-10 rounded-2xl font-semibold border-2 border-custom-border flex items-center justify-center shadow-lg select-none">
                <h2>Sign Up</h2>
            </div>
        </Link>
    );
};

export default SignUpBtn;
