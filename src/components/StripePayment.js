import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { isAuthenticated } from '../auth';
import {createOrder, getBraintreeClientToken} from '../actions/apiCore';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
    //might need to get token from braingree token...
    //for token:
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    //for order data
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        total: "",
        cartItems: [],
        error: "",
        success: false,
    })

    const {firstName, lastName, email, country, address, total, cartItems, error} = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }    

  const stripe = useStripe();
  const elements = useElements();

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




  const handleSubmit = (event) => {
    event.preventDefault();
    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });
    createOrder(userId, token, values);
    console.log(values);
  };


  return (
      <div>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-6 mb-3">
                <div className="firstName">First Name</div>
                <input type="text" onChange={handleChange('firstName')} className="form-control" placeholder="First Name" required />
            </div>
            <div class="col-md-6 mb-3">
                <div className="lastName">Last name</div>
                <input type="text" onChange={handleChange('lastName')} className="form-control" placeholder="Last name" required />
            </div>
            <div className="col-md-6 mb-3">
                <div className="email">Email</div>
                <input type="email" onChange={handleChange('email')} className="form-control" placeholder="you@example.com" required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 mb-3">
                <div className="address">Address</div>
                <input type="text" onChange={handleChange('address')} className="form-control"placeholder="1234 Main St" required />
            </div>
            <div className="col-md-6 mb-3">
                <div className="address">Country</div>
                <input type="text" onChange={handleChange('country')} className="form-control"placeholder="Country" required />
            </div>
        </div>
        <div className="stripe">
        <CardElement
            onReady={(el) => el.focus()}
            options={{
                style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                    color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
                },
            }}
            />
        </div>
        <button type="submit" disabled={!stripe} className="btn btn-warning">
            Order
        </button>
        {JSON.stringify(values)}
        </form>
    </div>
  );
};

export default CheckoutForm;