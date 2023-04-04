import React from 'react';
import "./Header.css";
import logo from "../../../public/images/Logo.svg"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">

            <div className="">
                <img src={logo} alt=""/>
            </div>

            <nav className='headerNav'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
            </nav>

        </header>
    );
};

export default Header;