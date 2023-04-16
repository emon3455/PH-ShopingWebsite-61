import React, { useContext } from 'react';
import "./Header.css";
import logo from "../../../public/images/Logo.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

    const {user,logOut} = useContext(AuthContext);
    

    const handleSignOut=()=>{
        logOut()
        .then(res=>{
            alert("Thank You for visiting");
        })
        .catch(er=>{
            console.log(er.message);
        })
    }

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
                <Link to="/checkout">Checkout</Link>
                <Link to="/signup">Sign Up</Link>
                {
                    user && <span style={{color: "white"}}>Welcome: {user.email} <button onClick={handleSignOut}>Sign Out</button> </span>
                }
            </nav>

        </header>
    );
};

export default Header;