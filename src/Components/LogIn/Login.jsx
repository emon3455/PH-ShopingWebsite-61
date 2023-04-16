import React, { useContext, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import "./Login.css"
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const {signIn} = useContext(AuthContext);

    const [error , setError] = useState("");

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email , password);

        signIn(email,password)
        .then(res=>{
            const logedUser = res.user;
            alert("Welcome!!");
            console.log(logedUser);
            form.reset();
            navigate(from, {replace:true});
        })
        .catch(er=>{
            setError(er.message);
        })
    }

    return (
        <div className='container'>
            <div className="form-container">

                <h2 className='form-title'>Log In</h2>

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
                    <button className='login-btn'>
                        Log In
                    </button>

                    <p className='link-text'>
                        New To Ema-john ? <Link to="/signup">create New Account</Link>
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

export default Login;