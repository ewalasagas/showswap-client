import {API} from "../config";

export const getTickets_test = async (sortBy) => {
    try {
        //limiting to 2 for testing
        const response = await fetch(`${API}/tickets?sortBy=${sortBy}&order=desc&limit=2`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

//for payments - NEED TO TURN INTO REDUX
export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

//for orders - NEED TO TURN INTO REDUX
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.parse({order: createOrderData})  //might need to parse if unable to read
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
