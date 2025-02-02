import { useState } from 'react';
import usersData from '../data/users.json';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = (e) => {

        e.preventDefault();
        const userExists = usersData.users.find(user => user.username === username);
        if (userExists) {
            setError('Username already exists');
            toast.info('User already exists', { autoClose: 2000 });

            
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
        } else {
            const newUser = { username, password };
            usersData.users.push(newUser);
            // Assuming you have a function to save the updated usersData to the JSON file
            saveUsersData(usersData);
            toast.info('User created successfully!');
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);

        }
    };

    const saveUsersData = (data) => {
        localStorage.setItem('usersData', JSON.stringify(data));
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-custom-bg bg-cover bg-center '>
            <form onSubmit={handleSignUp} className='top-[230px] flex flex-col gap-4 left-[330px] absolute font-harabara text-custom-blue text-[24px]' >
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
                <button className="border border-2 border-custom-blue rounded-xl" type="submit">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;