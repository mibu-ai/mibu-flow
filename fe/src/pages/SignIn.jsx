import { useState } from 'react';
import usersData from '../data/users.json';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSignIn = (e) => {
        e.preventDefault();
        const storedUsersData = JSON.parse(localStorage.getItem('usersData'));
        const userJson = usersData?.users.find(user => user.username === username && user.password === password);
        const user = storedUsersData?.users.find(user => user.username === username && user.password === password);
        if (user || userJson) {
            toast.info('Sign in successful!');
            setTimeout(() => {
                window.location.href = '/edit';
            }, 2000);
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-custom-bg bg-cover bg-center '>
            <form onSubmit={handleSignIn} className='top-[230px] flex flex-col gap-4 left-[330px] absolute font-harabara text-custom-blue text-[24px]' >
                <div className='flex gap-4'>
                    <label>Username:</label>
                    <input 
                    className='border-2 border-custom-border rounded-lg h-10 w-60 font-poppins'
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className='flex gap-4'>
                    <label>Password:</label>
                    <input 
                    className='border-2 border-custom-border rounded-lg h-10 w-60 font-poppins'
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button className="border border-2 border-custom-blue rounded-xl" type="submit">Sign In</button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default SignIn;