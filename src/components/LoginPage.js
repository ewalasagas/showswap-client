import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import Video from './video';
import loginVideo from '../images/login_video.mp4';
import { FcGoogle } from 'react-icons/fc';
import {Link, Redirect} from 'react-router-dom'; 
import Form from './form';
import GoogleAuth from './GoogleAuth';
import {signin, authenticate, isAuthenticated} from '../auth';

const LoginPage = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }    

    const clickSubmit = event => {
        event.preventDefault();
        console.log("click-submit")
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                console.log("data-error")
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    console.log("authenticate")
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h4>Loading...</h4>
        </div>)
    );

    const redirectUser = () => {    //based on role
        if(redirectToReferrer) {
            if(user && user.role === 1) {
                // return <Redirect to={{ pathname: "/"}} />
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }

        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Form>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            {showError()}
            {showLoading()}
            <label className="sr-only">Email Address</label>
            <input onChange={handleChange('email')} type="email" className="form-control" placeholder="Email Address" id="inputEmail" required autoFocus/>
            <label className="sr-only">Password</label>
            <input onChange={handleChange('password')} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                </label>
            </div>
            <button 
                className="btn btn-lg btn-primary btn-block" 
                type="submit"
                onClick={clickSubmit}
            >Sign in</button>
            {redirectUser()}
            {/* <GoogleAuth /> */}
            <div>New User? <Link to="/register">Register</Link> today</div>
        </Form>
    );
}

export default LoginPage;