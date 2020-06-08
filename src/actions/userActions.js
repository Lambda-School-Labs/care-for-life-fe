export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
