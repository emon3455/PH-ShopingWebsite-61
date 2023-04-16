import React, { useContext, useState } from 'react';
import "./../LogIn/Login.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {

    const {createUser} = useContext(AuthContext);


    const [error , setError] = useState("");

    const handleSubmit =(e)=>{

        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;


        setError("");
        if(password !== confirm){
            setError("Your Password didn't match");
            return;
        }
        else if(password.length < 6){
            setError("your password must be atleast 6 character");
            return;
        }

        createUser(email,password)
        .then(res=>{
            const signedUser = res.user;
            alert("Your account has been crerated!!");
            console.log(signedUser);
            form.reset();
        })
        .catch(er=>{
            setError(er.message);
        })



    }

    return (
        <div className='container'>
            <div className="form-container">

                <h2 className='form-title'>Sign Up</h2>

                <p className='error'>{error}</p>

                <form onSubmit={handleSubmit} className='form'>
                    <div className="form-controler">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' required/>
                    </div>
                    <div className="form-controler">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' required/>
                    </div>
                    <div className="form-controler">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name='confirm' id='confirm' required/>
                    </div>
                    <button className='login-btn'>
                        Sign Up
                    </button>

                    <p className='link-text'>
                        Already Have an account ? <Link to="/login">Login</Link>
                    </p>

                    <div className="options">
                        <p>-------------</p>
                        <p>OR</p>
                        <p>-------------</p>
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