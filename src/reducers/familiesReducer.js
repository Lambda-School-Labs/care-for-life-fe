import {
  GET_FAMILIES_SUCCESS,
  GET_FAMILIES_LOADING,
  GET_FAMILIES_FAILURE,
  SET_CHOSEN_FAMILIES,
} from "../actions/familyActions.js";

let initialState = {
  families: [],
  chosenFamilies: [],
  error: null,
  isLoading: false,
};

export default familyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAMILIES_LOADING:
      console.log("loading");
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_FAMILIES_SUCCESS:
      console.log("loading success");
      return {
        ...state,
        families: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_FAMILIES_FAILURE:
      console.log("loading failed");
      return {
        ...state,
        families: [],
        isLoading: false,
        error: action.payload,
      };
    case SET_CHOSEN_FAMILIES:
      console.log("setting families");
      return {
        ...state,
        chosenFamilies: action.payload,
      };
    default:
      return state;
  }
};
