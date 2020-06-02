import React from "react";
import Routes from "./src/routes";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from "./src/reducers/userReducer";

let store = createStore(combineReducers({ userReducer }));

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
