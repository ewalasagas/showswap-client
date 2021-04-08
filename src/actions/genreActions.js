import {GET_GENRES} from '../components/types';
import {API} from '../config';

export const getGenres = () => async (dispatch) => {
    const res = await fetch(`${API}/genres`);
    const data = await res.json();  //then we can access data.names
    dispatch({
        type: GET_GENRES,
        payload: data,
    });
}
