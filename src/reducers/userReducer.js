import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/userActions.js';

let initialState = {
    user: {
        loggedIn: false,
        validToken: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("loggin in...");
            return state;
        case LOGOUT_SUCCESS:
            console.log('logging out')
            return state;
        default:
            return state
    }
}