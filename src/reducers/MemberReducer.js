import {
  POST_FAMILY_MEMBER,
  POST_FAMILY_MEMBER_SUCCESS,
  POST_FAMILY_MEMBER_FAILURE,
} from "../actions/MemberAction";

let initialState = {
  error: null,
  isLoading: false,
};

export default familyMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FAMILY_MEMBER:
      console.log("loading");
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_FAMILY_MEMBER_SUCCESS:
      console.log("loading success");
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case POST_FAMILY_MEMBER_FAILURE:
      console.log("loading failed");
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
