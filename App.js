import React from "react";
import Routes from "./src/routes";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(combineReducers({}));

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
