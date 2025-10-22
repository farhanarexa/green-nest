import React from 'react';
import Navbar from '../../Components/Common/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Common/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;