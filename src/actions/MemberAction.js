import axios from "axios";
import { POST_FAMILY_FAILURE } from "./familyFormAction";
export const POST_FAMILY_MEMBER = "POST_FAMILY_MEMBER";
export const POST_FAMILY_MEMBER_SUCCESS = "POST_FAMILY_MEMBER_SUCCESS";
export const POST_FAMILY_MEMBER_FAILURE = "POST_FAMILY_MEMBER_FAILURE";

export const familyMemberPost = () => ({ type: POST_FAMILY_MEMBER });

export const postFamilyMemberSuccess = (data) => ({
  type: POST_FAMILY_MEMBER_SUCCESS,
  payload: data,
});

export const postFamilyMemberFailure = (error) => ({
  type: POST_FAMILY_FAILURE,
  payload: error,
});

export function postFamilyMember(values) {
  return function (dispatch) {
    dispatch(familyMemberPost);

    return axios
      .post("https://care-for-life.herokuapp.com/api/individuals", values)
      .then(() => {
        console.log("***FAMILY MEMBER VALUES**** \n", values);
        dispatch(postFamilyMemberSuccess());
      })
      .catch((error) => {
        dispatch(postFamilyMemberFailure(error));
      });
  };
}
