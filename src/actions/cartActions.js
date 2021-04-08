import { ADD_TO_CART, REMOVE_FROM_CART, CART_TOTAL } from "../components/types";

export const addToCart = (ticket) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach(e => {
        //and check that if ticket.quantity is not capped
        if(e._id === ticket._id ){
            alreadyExists = true;
            e.count++;
        }
    });
    if(!alreadyExists){
        cartItems.push({...ticket, count: 1});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


export const removeFromCart = (ticket) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice()
    .filter(e => e._id !== ticket._id)    //if item not equal to ticket, then return true
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// export const cartTotal = () => (dispatch, getState) => {
//     //need to add even if multiple quantities exist
//     const cartItems =  getState().cart.cartItems;
//     dispatch({
//         type: CART_TOTAL,
//         payload: {cartItems}
//     });
//     // localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

export const cartTotal = () => (dispatch, getState) => {
    //need to add even if multiple quantities exist
    const cartItems =  getState().cart.cartItems.slice();
    let total = cartItems.forEach(e => {
        total = e.count
    });
    dispatch({
        type: CART_TOTAL,
        payload: {total}
    });
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
}