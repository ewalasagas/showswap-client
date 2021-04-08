import {FILTER_TICKETS_BY_GENRE, GET_TICKETS, ORDER_TICKETS_BY_PRICE, GET_GENRES, GET_TICKETS_BY_USER} from '../components/types';
import {API} from '../config';

export const getTickets = () => async (dispatch) => {
    const res = await fetch(`${API}/tickets`);
    const data = await res.json();
    dispatch({
        type: GET_TICKETS,
        payload: data,
    });
};

//to display list of tickets by user
export const getTicketsByUser = (userId) => async (dispatch) => {
    const res = await fetch(`${API}/tickets/${userId}`);
    const data = await res.json();
    dispatch({
        type: GET_TICKETS_BY_USER,
        payload: data,
    });
};


//first arg: all tickets from server, 2nd arg: genre we're going to filter
export const filterTickets = (tickets, genre) => (dispatch) => {
    dispatch({
        type: FILTER_TICKETS_BY_GENRE,
        payload: {  //return 2 values, first is selected genre, 2nd is filtered genres
            genre: genre,   //genre is the genre that user selected
            items: genre === ""? tickets    //based on the genre - filtered by checking all available
                : tickets.filter(x => x.availableGenres.indexOf(genre) >= 0),
        }
    })
}

export const sortTickets = (filteredTickets, sort) => (dispatch) => {
    const sortedTickets = filteredTickets.slice();
    if(sort === "latest") {
        sortedTickets.sort((a,b) => (a.id > b.id) ? 1 : -1);
    } else {
        sortedTickets.sort((a,b) => (
            //lowest to highest
            sort === "lowest" ? a.price > b.price ? 1: -1
            //else...higest to lowest
            :a.price > b.price ? -1 : 1
        ))
    }
    dispatch({
        type: ORDER_TICKETS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedTickets
        }
    })
}