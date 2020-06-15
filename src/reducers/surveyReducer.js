import {
    GET_SURVEY_SUCCESS,
    GET_SURVEY_LOADING,
    GET_SURVEY_FAILURE,
    ADD_RESPONSE,
    STAGE_RESPONSES,
    SET_CURRENT_FAM,
    SET_CURRENT_INDIVIDUAL,
    CREATE_COMPLETED_SURVEY_LOADING,
    CREATE_COMPLETED_SURVEY_SUCCESS,
    CREATE_COMPLETED_SURVEY_FAILURE,
} from "../actions/surveyActions.js";

let initialState = {
    currentFamily: null,
    currentIndividual: null,
    currentCompSurvey: null,
    survey_questions: [],
    stagedResponses: [],
    responses: [],
    surveyError: null,
    loadingSurvey: false,
    compSurveyLoading: false,
    compSurveyError: null
};

export default surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SURVEY_LOADING:
            console.log("loading survey");
            return {
                ...state,
                loadingSurvey: true,
                surveyError: null,
            };
        case GET_SURVEY_SUCCESS:
            console.log("loading survey success");
            return {
                ...state,
                survey_questions: action.payload,
                loadingSurvey: false,
                surveyError: null,
            };
        case GET_SURVEY_FAILURE:
            console.log("loading survey failed");
            return {
                ...state,
                loadingSurvey: false,
                surveyError: action.payload,
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
        case SET_CURRENT_FAM:
            console.log("staging responses");
            return {
                ...state,
                currentFamily: action.payload
            };
        case SET_CURRENT_INDIVIDUAL:
            console.log("staging responses");
            return {
                ...state,
                currentIndividual: action.payload
            };
        case CREATE_COMPLETED_SURVEY_LOADING:
            console.log("creating completed survey")
            return {

            }
        case CREATE_COMPLETED_SURVEY_SUCCESS:
            console.log("creating completed survey")
            return {
                ...state,
                currentCompSurvey: action.payload,
                compSurveyLoading: false,
                compSurveyError: null,
            }
        case CREATE_COMPLETED_SURVEY_FAILURE:
            console.log("creating completed survey")
            return {
                ...state,
                compSurveyLoading: false,
                CompSurveyError: action.payload
            }
        default:
            return state;
    }
};