import React from 'react';
import "./../LogIn/Login.css"
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='container'>
            <div className="form-container">

                <h2 className='form-title'>Sign Up</h2>

                <form className='form'>
                    <div className="form-controler">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' required/>
                    </div>
                    <div className="form-controler">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' required/>
                    </div>
                    <div className="form-controler">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name='password' id='password' required/>
                    </div>
                    <button className='login-btn'>
                        Sign Up
                    </button>

                    <p className='link-text'>
                        Already Have an account ? <Link to="/login">Login</Link>
                    </p>

                    <div className="options">
                        <p>----------------</p>
                        <p>OR</p>
                        <p>----------------</p>
                    </div>

                </form>

                <p className='social-login'>
                    <img className='google-logo' src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg" alt="" />
                    <span>Continue With Google</span>
                </p>

            </div>
        </div>
    );
};

export default SignUp;