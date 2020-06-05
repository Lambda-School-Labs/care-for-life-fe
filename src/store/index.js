import { reducer as formReducer } from "redux-form";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import familyReducer from "../reducers/familiesReducer";

const store = createStore(
  combineReducers({ userReducer, familyReducer, formReducer }),
  applyMiddleware(thunk)
);

export default store;
