import {FILTER_TICKETS_BY_GENRE, GET_TICKETS, ORDER_TICKETS_BY_PRICE, GET_GENRES, GET_TICKETS_BY_USER} from '../components/types';

export const ticketsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_GENRES :
            return {test: action.payload};
        case FILTER_TICKETS_BY_GENRE:
            return {
                ...state,
                genre: action.payload.genre,
                filteredItems: action.payload.items,
            };
        case ORDER_TICKETS_BY_PRICE:
            return {
                ...state, 
                sort: action.payload.sort, 
                filteredItems: action.payload.items
            };
        case GET_TICKETS_BY_USER:
            return {
                ...state, 
                sort: action.payload.sort, 
                filteredItems: action.payload.items
            };
        case GET_TICKETS:
            return {items: action.payload, filteredItems: action.payload};
        default:
            return state;
    }
};
