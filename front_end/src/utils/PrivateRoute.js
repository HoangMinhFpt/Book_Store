import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ role }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        console.log("error1");
        return <Navigate to="/auth" />;
    }

    if (role && user.role_name !== role) {
        console.log("error2");
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
