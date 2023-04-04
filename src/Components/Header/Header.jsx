import React from 'react';
import "./Header.css";
import logo from "../../../public/images/Logo.svg"

const Header = () => {
    return (
        <header className="header">

            <div className="">
                <img src={logo} alt=""/>
            </div>

            <nav className='headerNav'>
                <a href="./shop">Shop</a>
                <a href="./order">Orders</a>
                <a href="./inventory">Inventory</a>
                <a href="./login">Login</a>
            </nav>

        </header>
    );
};

export default Header;