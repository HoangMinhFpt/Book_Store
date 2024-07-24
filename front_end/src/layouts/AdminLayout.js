import React, { Fragment } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <Fragment>
            <div className="admin-layout">
                <Sidebar />
                <main><Outlet /> </main>
            </div>
        </Fragment>
    );
};

export default AdminLayout;
