import { reducer as formReducer } from "redux-form";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import familyReducer from "../reducers/familiesReducer";
import familyFormReducer from "../reducers/familyFormReducer";

const store = createStore(
  combineReducers({
    userReducer,
    familyReducer,
    familyFormReducer,
    formReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
