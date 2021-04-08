import React, { useState } from "react";
import { Link} from "react-router-dom";
import { isAuthenticated } from "../auth";
import {createGenre} from './apiAdmin';

const AddGenre = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and info from localstorage
    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
        setError('');
        setName(event.target.value)
    }

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">{name} is created</h3>
        } 
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category already exists</h3>
        } 
    }

    const goBack = () => (
        <div className="new-genre back mt-5">
            <Link to="/admin/dashboard" className="new-genre text-warning">BACK TO DASHBOARD</Link>
        </div>
    )
    
    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        //make request to API to create genre
        createGenre(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setError('')
                setSuccess(true);
            }
        })
    }

    const newGenreForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group mt-8">
                <h1 className="genre-title">Ready to add a new genre?</h1>
                <label className="text-muted">NEW GENRE NAME:</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-light" type="submit">Create Genre</button>
        </form>
    )

    const createHeader = () => {
        return (
            <div className="jumbotron mt-3 genre-header">
                <h1 className="display-4 admin-welcome">Create Genre</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas non augue eget euismod. Vivamus eu luctus est. Sed scelerisque odio ac erat tempus pellentesque.</p>
                <hr className="my-4" />
                <p>Donec nec nulla vel ipsum egestas auctor in in nibh. Vestibulum ac sagittis mi. In a sapien odio. Nullam bibendum a risus quis vehicula. Nulla facilisi. Aenean elit neque, porta vel sagittis ac, bibendum eu dolor. Vestibulum non molestie metus. Phasellus pellentesque ultrices ligula, at viverra mauris accumsan eget. </p>
            </div>
        )
    }




    return (
        <div className="new-genre">
            {createHeader()}
            {showSuccess()}
            {showError()}
            <div className="new-genre row">
                <div className="new-genre col-md-8 offset-md-2">{newGenreForm()}</div>
            </div>
            {goBack()}
        </div>
    )
}

export default AddGenre; 