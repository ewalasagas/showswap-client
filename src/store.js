import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { ticketsReducer } from './reducers/ticketsReducer';
import { authReducer } from './reducers/authReducer';
import { genreReducer } from './reducers/genreReducer';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    genres: genreReducer,
    tickets: ticketsReducer,
    cart: cartReducer,
    auth: authReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;