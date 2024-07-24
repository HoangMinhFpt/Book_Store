import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAuth } from '../services/Auth';
import { toast } from 'react-toastify';
import "../styles/page/Register.scss"

const Register = ({ loginForm }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        toast.promise(registerAuth({ email, password, role, username }), {
            pending: 'Processing your request...',
            success: 'Register successfully!',
            error: 'Register failed. Please try again.'
        }).then(() => {
            navigate('/auth');
            toast('Please login again');
            setEmail('')
            setUsername('')
            setPassword('')
            loginForm()
        }).catch((error) => {
            console.error('Register error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Register error failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Register failed. Please try again.')
            }
        })
    };

    return (
        <div className="signin-container">
            <div className="title-signin">Register</div>
            <div className="signin-content">
                <div className="signin-input-content">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span>Email</span>
                </div>
                <div className="signin-input-content">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span>Name</span>
                </div>
                <div className="signin-input-content">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span>Password</span>
                </div>
                <div>
                    <button className="btn-submit" onClick={handleSubmit}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
