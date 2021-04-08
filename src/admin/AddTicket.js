import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {createTicket, getGenres} from './apiAdmin';

const AddTicket = () => {

    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        image: '',
        artistName: '',
        seat:'',
        venue: '',
        city: '',
        quantity: '',
        state: '',
        price: '',
        genres: [],  //will populate list of categories
        genre: '',
        concertDate: '',
        shipping: '',
        seller: user._id,
        loading: false,
        error: '',
        createdTicket: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        // image,
        artistName,
        seat,
        venue,
        city,
        quantity,
        state,
        price,
        genres,  //will populate list of categories
        genre,
        concertDate,
        shipping,
        // seller: user._id,
        loading,
        error,
        createdTicket,
        redirectToProfile,
        formData
    } = values

    //to get genres and set form data
    const init = () => {
        getGenres().then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
                return;
            } else {
                setValues({...values, genres: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    const goBack = () => (
        <div className="new-genre back mt-5">
            <Link to="/" className="new-genre text-warning">BACK TO HOMESCREEN</Link>
        </div>
    )
    
    const clickSubmit = (event) => {
        event.preventDefault();
        console.log("click-submit")
        setValues({...values, error: "", loading: true});
        createTicket(user._id, token, formData)
        .then(data => {
            if(data.error) {
                console.log("error");
                setValues({...values, error: data.error});
                return;
            } else {
                console.log(console.log("setting values"))
                setValues({
                    ...values, 
                    image: "",
                    seller: user._id,
                    artistName: "",
                    seat: "",
                    venue: "",
                    city: "",
                    quantity: "",
                    state: "",
                    price: "",
                    concertDate: "",
                    shipping: "",
                    loading: false,
                    createdTicket: data.name,
                    redirectToProfile: true
                })
            }
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdTicket ? '' : 'none'}}>
            <h2>{`${createdTicket}`} is created!</h2>
        </div>
    )

    const showLoading = () => {
        loading && (<div className="alert alert-sucess">
            <h2>Loading...</h2>
        </div>)
    }

    const createHeader = () => {
        return (
            <div className="jumbotron mt-3 create-header">
                <h1 className="display-4 admin-welcome">Create Ticket</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas non augue eget euismod. Vivamus eu luctus est. Sed scelerisque odio ac erat tempus pellentesque.</p>
                <hr className="my-4" />
                <p>Donec nec nulla vel ipsum egestas auctor in in nibh. Vestibulum ac sagittis mi. In a sapien odio. Nullam bibendum a risus quis vehicula. Nulla facilisi. Aenean elit neque, porta vel sagittis ac, bibendum eu dolor. Vestibulum non molestie metus. Phasellus pellentesque ultrices ligula, at viverra mauris accumsan eget. </p>
            </div>
        )
    }

    const redirectUser = () => {   
        if(redirectToProfile) {
            return <Redirect to="/" />;
        }
    }

    const newPostForm = () => (
        <form onSubmit={clickSubmit} className="justify-content-center">
            <h1 className="genre-title">Ready to add a new ticket?</h1>
            <div className="row justify-content-center">
            <label className="text-muted">Post Photo</label>
            <div className="new-ticket col-md-10">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('image')} type="file" name="image" accept="image/*" required/>
                </label>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Artist Name</label>
                <input onChange={handleChange('artistName')} type="text" className="form-control" value={artistName} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Seat</label>
                <input onChange={handleChange('seat')} type="text" className="form-control" value={seat} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Venue</label>
                <input onChange={handleChange('venue')} type="text" className="form-control" value={venue} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Genre</label>
                <select onChange={handleChange('genre')} className="form-control">
                    <option>Please select</option>
                    {genres &&
                        genres.map((g, idx) => (
                            <option key={idx} value={g._id}>
                                {g.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Concert Date</label>
                <input onChange={handleChange('concertDate')} type="text" className="form-control" value={concertDate} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">City</label>
                <input onChange={handleChange('city')} type="text" className="form-control" value={city} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">State</label>
                <input onChange={handleChange('state')} type="text" className="form-control" value={state} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="text" className="form-control" value={quantity} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="text" className="form-control" value={price} required/>
            </div>
            <div className="new-ticket col-md-6 mb-3">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-light col-md-5 mb-3" type="submit">Create Ticket</button>
            </div>
            {redirectUser()}
        </form>
    )


    return (
        <div className="new-genre">
            {createHeader()}
            <div className="new-genre row">
                {showLoading()}
                {showSuccess()}
                {showError()}
                <div className="new-genre col-md-8 offset-md-2">{newPostForm()}</div>
            </div>
            {goBack()}
        </div>
    )
}

export default AddTicket;