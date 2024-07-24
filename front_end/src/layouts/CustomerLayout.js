import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const CustomerLayout = () => {
    return (
        <div className='wrapper'>
            <header className='header-item'>
                <Header />
            </header>
            <div className="customer-layout">
                <main><Outlet /></main>
            </div>
            <footer className='footer-item'>
                <Footer />
            </footer>
        </div>
    );
};

export default CustomerLayout;
