import React from "react";
import Routes from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
