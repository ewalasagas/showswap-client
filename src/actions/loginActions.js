import {SIGN_IN, SIGN_OUT} from '../components/types';

export const signIn = (history) => {
    return {
        type: SIGN_IN
    };
};

export const signOut = (history) => {
    return {
        type: SIGN_OUT
    }
}