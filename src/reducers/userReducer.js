import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SAVE_USER, SAVE_ID } from "../actions/userActions.js";

let initialState = {
  user: {
    loggedIn: false,
    validToken: false,
    email: '',
    zone_id: 0,
    community_id: 0,
    user_id: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("loggin in...");
      return state;
    case LOGOUT_SUCCESS:
      console.log("logging out");
      return state;
    case SAVE_USER:
      console.log('action.payload', action.payload)
      return {
        ...state.user,
        email: action.payload.email,
        zone_id: action.payload.zone_id,
        community_id: action.payload.community_id,
        user_id: action.payload.id
      };
    default:
      return state;
  }
};
