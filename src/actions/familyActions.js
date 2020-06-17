import axios from "axios";
export const GET_FAMILIES_LOADING = "GET_FAMILIES_LOADING";
export const GET_FAMILIES_FAILURE = "GET_FAMILIES_FAILURE";
export const GET_FAMILIES_SUCCESS = "GET_FAMILIES_SUCCESS";
export const SET_CHOSEN_FAMILIES = "SET_CHOSEN_FAMILIES";

export const familiesLoading = () => ({ type: GET_FAMILIES_LOADING });

export const getFamiliesSuccess = (data) => ({
    type: GET_FAMILIES_SUCCESS,
    payload: data,
});

export const getFamiliesFailure = (error) => ({
    type: GET_FAMILIES_FAILURE,
    payload: error,
});

export const setChosenFamilies = (families) => ({
    type: SET_CHOSEN_FAMILIES,
    payload: families
})

export function getFamilies() {
    return function (dispatch) {
        dispatch(familiesLoading()); ///Loading

        return axios
            .get(`https://care-for-life.herokuapp.com/api/families/zone/1`)
            .then((response) => {
                dispatch(getFamiliesSuccess(response.data)); /// Successfully got data
            })
            .catch((error) => {
                dispatch(getFamiliesFailure(error));
            });
    };
}