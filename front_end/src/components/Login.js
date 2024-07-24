import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../stores/reducers/authSlice';
import { loginAuth } from '../services/Auth';
import "../styles/page/Login.scss"
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        toast.promise(loginAuth({ email, password }), {
            pending: 'Processing your request...',
            success: 'Login successfully!',
            error: 'Login failed. Please try again.'
        }).then((response) => {
            dispatch(login(response));
            navigate(response.user.role_name === 'admin' ? '/admin/dashboard' : '/');
        }).catch((error) => {
            console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Login error failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Login failed. Please try again.')
            }
        })
    };

    return (
        <div className="signin-container">
            <div className="title-signin">Sign In</div>
            <div className="signin-content">
                <div className="signin-input-content">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span>email</span>
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
            </div>
            <div>
                <button className="btn-submit" onClick={handleSubmit}>
                    Log In
                </button>
            </div>
            {/* <div className="text-signup-content">
                Don`t have an account?
                <Link className="link-signup" to={"/register"}>
                    register
                </Link>
            </div> */}
        </div>
    );
};

export default Login;
