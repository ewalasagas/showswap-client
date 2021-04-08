import React, { useEffect, useState } from 'react';
import {Link, Redirect} from "react-router-dom";
import {getBraintreeClientToken, createOrder} from '../actions/apiCore';
import {cartTotal} from '../actions/cartActions';
import { isAuthenticated } from '../auth';
import DropIn from "braintree-web-drop-in-react";
import CheckoutForm from './StripePayment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {S_KEY} from '../config';
import Store from './BraintreeDrop'

const CheckoutCart = () => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const stripePromise = loadStripe(S_KEY);

    //get client token from backend
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                console.log('Error occured')
                setData({...data, error: data.error})
            } else {
                setData({...data, clientToken: data.clientToken})
                console.log(data);
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ): (
            <Link to="/login">
                <button className="btn btn-primary">Signin to checkout</button>
            </Link>
        )
    }

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };


    const buy = () => {
        //send nonce to your server (nonce = data.instance.requestPaymentMethod())
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data)
            nonce = data.nonce//once you have nonce (Card type, card number) send nonce as payment Method Nonce
            console.log('send nonce and total to process: ', nonce, cartTotal())
        })
        .catch(error => {
            console.log('dropin error: ', error);
            setData({...data, error: error.message});
        })
    }

    const showDropIn = () => {
        <div>
            {data.clientToken !== null ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} 
                        onInstance={instance => (data.instance = instance)} 
                    />
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
            ) : null}
        </div>
    }


    return (
        <div className="col-md-8 order-md-1">
            <h1 className="mb-3">Billing</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
        </div>           
    );
}

export default CheckoutCart;