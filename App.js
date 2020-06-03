import React from "react";
import Routes from "./src/routes";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from "./src/reducers/userReducer";
import familyReducer from "./src/reducers/familiesReducer";

let store = createStore(combineReducers({ userReducer, familyReducer }));

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
