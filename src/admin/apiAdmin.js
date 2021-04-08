import {API} from '../config';

export const createGenre = async (userId, token, genre) => {
    try {
        const response = await fetch(`${API}/genre/create/${userId}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(genre)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const createTicket = async (userId, token, ticket) => {
    try {
        const response = await fetch(`${API}/ticket/create/${userId}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //this is the form-data for tickets
            body: ticket
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(`${API}/genres`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const deleteTicket = async (ticketId, userId, token) => {
    try {
        const response = await fetch(`${API}/ticket/${ticketId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
