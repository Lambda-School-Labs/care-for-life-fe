import axios from "axios";
export const GET_FAMILIES_LOADING = "GET_FAMILIES_LOADING";
export const GET_FAMILIES_FAILURE = "GET_FAMILIES_FAILURE";
export const GET_FAMILIES_SUCCESS = "GET_FAMILIES_SUCCESS";
export const SET_CHOSEN_FAMILIES = "SET_CHOSEN_FAMILIES";
export const GET_fAMILY_MEMBERS_LOADING = "FET_FAMILY_MEMBERS_LOADING";
export const GET_fAMILY_MEMBERS_SUCCESS = "FET_FAMILY_MEMBERS_SUCCESS";
export const GET_fAMILY_MEMBERS_FAILURE = "FET_FAMILY_MEMBERS_FAILURE";


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

export const familieMembersLoading = () => ({ type: GET_FAMILY_MEMBERS_LOADING });

export const getFamiliesSuccess = (data) => ({
    type: GET_FAMILY_MEMBERS_SUCCESS,
    payload: data,
});

export const getFamiliesFailure = (error) => ({
    type: GET_FAMILY_MEMBERS_FAILURE,
    payload: error,
});



export function getFamilies() {
    return function (dispatch) {
        dispatch(familiesLoading()); ///Loading

        return axios
            .get(`https://care-for-life.herokuapp.com/api/families/zone/1`)
            .then((response) => {
                // console.log("families", response.data);
                dispatch(getFamiliesSuccess(response.data)); /// Successfully got data
            })
            .catch((error) => {
                // console.log("the data was not return", error);
                dispatch(getFamiliesFailure(error));
            });
    };
}

export function getFamilyMembers() {
    return function (dispatch) {
        dispatch(familyMembersLoading()); ///Loading

        return axios
            .get(`https://care-for-life.herokuapp.com/api/families/zone/10`)
            .then((response) => {
                // console.log("families", response.data);
                dispatch(getFamilyMembersSuccess(response.data)); /// Successfully got data
            })
            .catch((error) => {
                // console.log("the data was not return", error);
                dispatch(getFamilyMembersFailure(error));
            });
    };
}