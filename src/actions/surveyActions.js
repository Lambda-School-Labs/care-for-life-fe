import Axios from "axios";

const GET_SURVEY_LOADING = 'GET_SURVEY_LOADING';
const GET_SURVEY_SUCCESS = 'GET_SURVEY_SUCCESS';
const GET_SURVEY_FAILURE = 'GET_SURVEY_FAILURE';

const getSurveyLoading = () => ({
    type: GET_SURVEY_LOADING
})

const getSurveySuccess = (survey) => ({
    type: GET_SURVEY_SUCCESS,
    payload: survey
})

const getSurveyFailure = (err) => ({
    type: GET_SURVEY_FAILURE,
    payload: err
})

const fetchSurvey = () => {
    getSurveyLoading();

    axios
        .get(`https://care-for-life.herokuapp.com/api/survey/1`)
        .then(res => {
            console.log("survey res", res.data)
            getSurveySuccess(res.data)
        })
        .catch(err => {
            getSurveyFailure(err)
        })
}
