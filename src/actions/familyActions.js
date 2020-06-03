import axios from "axios";
export const GET_FAMILIES_FAILURE = 'GET_FAMILIES_FAILURE';
export const GET_FAMILIES_SUCCESS = 'GET_FAMILIES_SUCCESS';

export function getFamilies() {
    axios
        .get('https://care-for-life.herokuapp.com/api/families')
        .then(res => {
            console.log("family res", res.data);
            return {
                type: GET_FAMILIES_SUCCESS,
                payload: res.data
            }
        })
        .catch(err => {
            console.log("error", err)
            return {
                type: GET_FAMILIES_FAILURE
            }
        })
}