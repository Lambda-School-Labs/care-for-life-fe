import React from "react";
import Routes from "./src/routes";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./src/reducers/userReducer";
import familyReducer from "./src/reducers/familiesReducer";

// let store = createStore(combineReducers({ userReducer, familyReducer }));
// let store = createStore(familyReducer);

const store = createStore(
  combineReducers({ userReducer, familyReducer }),
  applyMiddleware(thunk)
);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
