import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createExpressionWithTypeArguments } from 'typescript';
import {cartTotal} from '../actions/cartActions';

class CartTotal extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {cartItems} = this.props;
        let cartCheck = () => {
            if(cartItems.length === 0){
                return (
                    <div className="cart cart-header">
                    Cart is empty
                    </div>
                )
            } else {
                return (
                    <div className="cart cart-header">
                        {cartItems.reduce((sum,itm) => sum + (itm.count), 0)}
                    </div>
                )
            }
        }

      
        return (
            <div className="navigation-icon">
                {cartCheck()}
            </div>
        );
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems
}),{cartTotal})(CartTotal);