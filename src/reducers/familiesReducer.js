import {
    GET_FAMILIES_SUCCESS,
    getFamilies
} from '../actions/familyActions.js';

let initialState = {
    families: []
};

export default async (state = initialState, action) => {
    switch (action.type) {
        case GET_FAMILIES_SUCCESS:
            console.log("got families");
            state.families = action.payload;
            return state;

        case GET_FAMILIES_FAILURE:
            console.log("getting families failed");
            state.families = action.payload;
            return state;

        default:
            return state
    }
}