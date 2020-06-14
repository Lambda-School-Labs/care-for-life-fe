import {
    GET_SURVEY_SUCCESS,
    GET_SURVEY_LOADING,
    GET_SURVEY_FAILURE,
    ADD_RESPONSE,
    STAGE_RESPONSES
} from "../actions/surveyActions.js";

let initialState = {
    survey_questions: [],
    stagedResponses: [],
    responses: [],
    error: null,
    isLoading: false
};

export default surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SURVEY_LOADING:
            console.log("loading survey");
            return {
                ...state,
                // isLoading: true,
                // error: null,
            };
        case GET_SURVEY_SUCCESS:
            console.log("loading survey success");
            return {
                ...state,
                survey_questions: action.payload,
                isLoading: false,
                error: null,
            };
        case GET_SURVEY_FAILURE:
            console.log("loading survey failed");
            return {
                ...state,
                // isLoading: false,
                // error: action.payload,
            };
        case ADD_RESPONSE:
            console.log("adding responses");
            return {
                ...state,
                responses: [...state.responses, action.payload]
            };
        case STAGE_RESPONSES:
            console.log("staging responses");
            return {
                ...state,
                stagedResponses: [...state.stagedResponses, ...state.responses],
                responses: []
            };
        default:
            return state;
    }
};