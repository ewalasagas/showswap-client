import {GET_GENRES} from '../components/types';

export const genreReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_GENRES :
            return {items: action.payload};
        default:
            return state;
    }
};
