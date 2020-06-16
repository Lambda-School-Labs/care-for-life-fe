import {
    RESET_RESPONSES,
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
    stagedResponses: [],
    survey_questions: [],
    surveyError: null,
    responses: [],
    loadingSurvey: false,
    compSurveyLoading: false,
    compSurveyError: null
};

export default surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_RESPONSES:
            console.log("resetting responses");
            return {
                ...state,
                responses: action.payload
            };
        case GET_SURVEY_LOADING:
            console.log("loading survey");
            return {
                ...state,
                loadingSurvey: true
            };
        case GET_SURVEY_SUCCESS:
            console.log("loading survey success");
            return {
                ...state,
                survey_questions: action.payload,
                loadingSurvey: false
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
            console.log("this is payload response", action.payload)
            return {
                ...state,
                responses: [...state.responses, action.payload]
            };
        case STAGE_RESPONSES:
            console.log("staging responses");
            return {
                ...state,
                stagedResponses: [...state.stagedResponses, ...action.payload]
            };
        case SET_CURRENT_FAM:
            console.log("setting current fam");
            return {
                ...state,
                currentFamily: action.payload
            };
        case SET_CURRENT_INDIVIDUAL:
            console.log("setting current individual");
            return {
                ...state,
                currentIndividual: action.payload
            };
        case CREATE_COMPLETED_SURVEY_LOADING:
            console.log("creating completed survey")
            return {
                ...state,
                compSurveyLoading: true,
                compSurveyError: null
            }
        case CREATE_COMPLETED_SURVEY_SUCCESS:
            console.log("created completed survey")
            console.log("comp survey payload:", action.payload)
            return {
                ...state,
                currentCompSurvey: action.payload,
                compSurveyLoading: false,
                compSurveyError: null,
            }
        case CREATE_COMPLETED_SURVEY_FAILURE:
            console.log("creating completed survey failed")
            return {
                ...state,
                compSurveyLoading: false,
                CompSurveyError: action.payload
            }
        default:
            return state;
    }
};