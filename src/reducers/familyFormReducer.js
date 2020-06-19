import {
  POST_FAMILY,
  POST_FAMILY_FAILURE,
  POST_FAMILY_SUCCESS,
} from "../actions/familyFormAction.js";

let initialState = {
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_FAMILY:
      console.log("loading");
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_FAMILY_SUCCESS:
      console.log("loading success");
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case POST_FAMILY_FAILURE:
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
