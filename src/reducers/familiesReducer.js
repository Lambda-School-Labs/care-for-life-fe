import {
  GET_FAMILIES_SUCCESS,
  GET_FAMILIES_LOADING,
  GET_FAMILIES_FAILURE,
  SET_CHOSEN_FAMILIES,
} from "../actions/familyActions.js";

let initialState = {
  /// getting families loading/error
  error: null,
  isLoading: false,
  /// all families in the given zone
  families: [],
  /// families that the user picked
  chosenFamilies: [],
};

export default familyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAMILIES_LOADING:
      console.log("loading families");
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_FAMILIES_SUCCESS:
      console.log("loaded families successfully");
      return {
        ...state,
        families: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_FAMILIES_FAILURE:
      console.log("failed to load families");
      return {
        ...state,
        families: [],
        isLoading: false,
        error: action.payload,
      };
    case SET_CHOSEN_FAMILIES:
      console.log("setting chosen families");
      return {
        ...state,
        chosenFamilies: action.payload,
      };
    default:
      return state;
  }
};
