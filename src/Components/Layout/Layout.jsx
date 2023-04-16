import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>

            <Header></Header>

            <main style={{padding: "1rem"}}>
                <Outlet></Outlet>
            </main>

        </div>
    );
};

export default Layout;