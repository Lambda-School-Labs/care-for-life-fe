export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SAVE_USER = "SAVE_USER";
export const SAVE_ID = "SAVE_ID";

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

export const saveUser = user => {
  return {
    type: SAVE_USER, payload: user
  };
}

export const saveId = id => {
  return {
    type: SAVE_ID, payload: id
  }
}