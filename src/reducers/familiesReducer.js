import {
    GET_FAMILIES_SUCCESS,
    GET_FAMILIES_LOADING,
    GET_FAMILIES_FAILURE
} from '../actions/familyActions.js';

let initialState = {
    families: [],
    error: null,
    isLoading: false
};

export default familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAMILIES_LOADING:
            console.log("loading")
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_FAMILIES_SUCCESS:
            console.log("loading success")
            return {
                ...state,
                families: action.payload,
                isLoading: false,
                error: null
            }
        case GET_FAMILIES_FAILURE:
            console.log("loading failed")
            return {
                ...state,
                families: [],
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}