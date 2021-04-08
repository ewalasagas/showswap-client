import React, {useState} from 'react';
import { FcGoogle } from 'react-icons/fc';
import {Link} from 'react-router-dom'; 
import Form from './form';
import {signup} from '../auth';


const RegisterPage = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {firstName, lastName, email, password, error, success} = values;

    const handleChange = firstName => event => {
        setValues({...values, error: false, [firstName]: event.target.value});
    }    

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        signup({firstName, lastName, email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({...values, 
                    firstName: '',  //to clear out entries after submit
                    lastName: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/login">Signin</Link>
        </div>
    );


    return (
        <Form>
            {showError()}
            {showSuccess()}
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <label className="sr-only">First Name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" placeholder="First Name" id="inputFirstName" required autoFocus/>
                <label className="sr-only">Last Name</label>
                <input onChange={handleChange('lastName')} type="text" className="form-control" placeholder="Last Name" id="inputLastName" required/>
                <br />
                <label className="sr-only">Email Address</label>
                <input onChange={handleChange('email')} type="email" className="form-control" placeholder="Email Address" id="inputEmail" required/>
                <label className="sr-only">Password</label>
                <input onChange={handleChange('password')} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <button onClick={clickSubmit} className="btn btn-lg btn-success btn-block" type="submit">Register</button>
         

            {/* {JSON.stringify(values)} */}
            {/* <p>Login with Google</p>
            <button className="btn btn-lg btn-primary btn-block" type="submit"><FcGoogle style={{fontSize: '30px'}} />oogle</button> */}
            <div>Already a member? <Link to="/login">Login</Link> today</div>
        </Form>
    );
}

export default RegisterPage;