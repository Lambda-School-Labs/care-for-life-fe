import axios from "axios";

export const GET_SURVEY_LOADING = 'GET_SURVEY_LOADING';
export const GET_SURVEY_SUCCESS = 'GET_SURVEY_SUCCESS';
export const GET_SURVEY_FAILURE = 'GET_SURVEY_FAILURE';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const STAGE_RESPONSES = 'STAGE_RESPONSES';
export const SET_CURRENT_FAM = 'SET_CURRENT_FAM';
export const SET_CURRENT_INDIVIDUAL = 'SET_CURRENT_INDIVIDUAL';
export const CREATE_COMPLETED_SURVEY_LOADING = 'CREATE_COMPLETED_SURVEY_LOADING';
export const CREATE_COMPLETED_SURVEY_SUCCESS = 'CREATE_COMPLETED_SURVEY_SUCCESS';
export const CREATE_COMPLETED_SURVEY_FAILURE = 'CREATE_COMPLETED_SURVEY_FAILURE';

export const getSurveyLoading = () => ({
    type: GET_SURVEY_LOADING
})

export const getSurveySuccess = (data) => ({
    type: GET_SURVEY_SUCCESS,
    payload: data
})

export const getSurveyFailure = () => ({
    type: GET_SURVEY_FAILURE
})

export const addResponse = (response) => ({
    type: ADD_RESPONSE,
    payload: response
})

export const stageResponses = (responses) => ({
    type: STAGE_RESPONSES,
    payload: responses
})

export const setCurrentFam = (famId) => ({
    type: SET_CURRENT_FAM,
    payload: famId
})

export const setCurrentIndividual = (indiId) => ({
    type: SET_CURRENT_INDIVIDUAL,
    payload: indiId
})

export const createCompSurveyLoading = () => ({
    type: CREATE_COOMPLETED_SURVEY_LOADING
})

export const createCompSurveySuccess = (data) => ({
    type: CREATE_COOMPLETED_SURVEY_SUCCESS,
    payload: data
})

export const createCompSurveyFailure = (err) => ({
    type: CREATE_COOMPLETED_SURVEY_FAILURE,
    payload: err
})

export function createCompletedSurvey(data) {
    console.log("using fetchSurvey")
    return function (dispatch) {
        dispatch(createCompSurveyLoading()); ///Loading

        return axios
            .get(`https://care-for-life.herokuapp.com/api/completedSurveys`, data)
            .then((response) => {
                dispatch(createCompSurveySuccess(response.data)); /// Successfully got data
            })
            .catch((error) => {
                dispatch(createCompSurveyFailure(error));
            });
    };
}

export function fetchSurvey() {
    console.log("using fetchSurvey")
    return function (dispatch) {
        dispatch(getSurveyLoading()); ///Loading

        return axios
            .get(`https://care-for-life.herokuapp.com/api/surveys/1/questions`)
            .then((response) => {
                // console.log("questions", response.data);
                dispatch(getSurveySuccess(response.data.sq)); /// Successfully got data
            })
            .catch((error) => {
                // console.log("the data was not return", error);
                dispatch(getSurveyFailure());
            });
    };
}
