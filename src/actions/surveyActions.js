import axios from "axios";

export const GET_SURVEY_LOADING = 'GET_SURVEY_LOADING';
export const GET_SURVEY_SUCCESS = 'GET_SURVEY_SUCCESS';
export const GET_SURVEY_FAILURE = 'GET_SURVEY_FAILURE';

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
