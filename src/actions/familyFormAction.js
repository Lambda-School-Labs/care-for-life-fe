import axios from "axios";
export const POST_FAMILY = "POST_FAMILY";
export const POST_FAMILY_FAILURE = "POST_FAMILY_FAILURE";
export const POST_FAMILY_SUCCESS = "POST_FAMILY_SUCCESS";

export const familyPost = () => ({ type: POST_FAMILY });

export const postFamilySuccess = (data) => ({
  type: POST_FAMILY_SUCCESS,
  payload: data,
});

export const postFamilyFailure = (error) => ({
  type: POST_FAMILY_FAILURE,
  payload: error,
});

export function postFamily(values) {
  return function (dispatch) {
    dispatch(familyPost()); ///Loading

    return axios
      .post(`https://care-for-life.herokuapp.com/api/families`, values)
      .then(() => {
        // console.log("families", response.data);
        dispatch(postFamilySuccess()); /// Successfully got data
      })
      .catch((error) => {
        // console.log("the data was not return", error);
        dispatch(postFamilyFailure(error));
      });
  };
}
