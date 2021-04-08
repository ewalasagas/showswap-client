import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from '../actions/cartActions';
import Countdown from './CountdownTimer';
import {BiTrash} from 'react-icons/bi';
import CheckoutCart from './CheckoutCart';
import ShowImage from './ShowImage';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCheckout: false //hide checkout form default
        }
    }

    render() {
        const {cartItems} = this.props;        
        return (
            <div>
                <div className="">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-items row justify-content-center">
                            <div className="cart-imagecontainer">
                                <ShowImage item={item} url="ticket" className="cart-imagecontainer-img"/>
                                {/* <img src={item.artistImage} alt={item.artistName} className="cart-imagecontainer-img"/> */}
                            </div>
                            <div className="cart-items-description col-sm-3">
                                <div className=""><h1>{item.artistName}</h1></div>
                                <div className="">${item.price.toFixed(2)} x {item.count}</div>
                            </div>
                            <div className="cart-items-description col-sm-3">
                                <div className=""><h4>ITEM DETAILS</h4></div>
                                <div className="cart-items-align-left">
                                    <div className="row"><span className="bold col-sm-4">venue: </span><span className="col-lg-auto">{item.venue}</span></div>
                                    <div className="row"><span className="bold col-sm-4">Location: </span><span className="col-lg-auto">{item.city}, {item.state}</span></div>
                                    <div className="row"><span className="bold col-sm-4">Date: </span><span className="col-lg-auto">{item.concertDate}</span></div>
                                </div>
                            </div>
                            <div className="cart-item-button" >
                                <button onCdivck={() => this.props.removeFromCart(item)} className="btn btn-danger">
                                    <BiTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                
                </div>
                <div className="cart-parent">
                    <div className="checkout-cart">
                        {cartItems.length !== 0 ? 
                            <div className="cart">
                                <div className="cart-total" >
                                    Total:
                                    ${cartItems.reduce((sum,itm) => sum + (itm.price * itm.count), 0).toFixed(2)}
                                </div>
                                <div className="countdown">
                                    <Countdown />
                                </div>
                                <button onClick={() => {this.setState({showCheckout: true})}} className="btn btn-success checkout-btn">
                                    Checkout
                                </button>
                            </div>
                        : ""}
                    </div>

                    <div className="checkout-form">
                            {this.state.showCheckout ?
                            <CheckoutCart /> 
                            : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems
}),{removeFromCart})(Cart);