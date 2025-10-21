import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>

            <header>
                <nav className="flex gap-4">
                    <a href="/">Home</a>
                    <a href="/plants">Plants</a>
                    <a href="/profile">My Profile</a>
                </nav>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;