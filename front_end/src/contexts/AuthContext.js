import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../stores/reducers/authSlice';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const loginUser = (userData) => {
        dispatch(login(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    return (
        <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
