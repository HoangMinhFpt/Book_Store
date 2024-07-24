import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "../styles/page/Auth.scss"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const hanldeChangeAuth = () => {
        setIsLogin(true)
    }
    return (
        <div className="auth-container">
            <div className={`auth-forms ${isLogin ? 'login-active' : 'register-active'}`}>
                <div className="forms-auth">
                    <div>
                        <Login className="login-form" />
                        <p onClick={() => setIsLogin(false)}>Don't have an account? Register</p>
                    </div>

                    <div>
                        <Register className="register-form" loginForm={hanldeChangeAuth} />
                        <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
                    </div>
                </div>
                <span className={`panels-auth ${isLogin ? 'login-active' : 'register-active'}`}>
                </span>
            </div>
        </div>
    );
};

export default Auth