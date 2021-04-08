import {API} from '../config';

export const signup = async user => {
    // console.log(firstName, lastName, email, password);
    try {
        const response = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Accept": 'application.json',
                "Content-Type": "application/json"
            },
            //"user" conversion to firstName,lastName,email,password
            body: JSON.stringify(user)
        });
        // console.log(response.json());
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const signin = async user => {
    // console.log(firstName, lastName, email, password);
    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Accept": 'application.json',
                "Content-Type": "application/json"
            },
            //"user" conversion to firstName,lastName,email,password
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) { 
        console.log(err);
    }
};

//so we don't have to resign in user each time
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

//For logout/signout feature
export const signout = async next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        try {
            const response = await fetch(`${API}/logout`, {
                method: 'GET'
            });
            console.log('signout', response);
        } catch (err) {
            return console.log(err);
        }
    }
};

//to check whether user is signedin/authenticated
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {  //check if token gets passed
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
