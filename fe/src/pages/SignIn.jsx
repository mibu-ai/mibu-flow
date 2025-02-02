import { useState } from 'react';
import usersData from '../data/users.json';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        const user = usersData.users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Sign in successful!');
            window.location.href = '/edit';
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
            </form>
        </div>
    );
};

export default SignIn;