import React from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/store";
import persistedStore from "./src/store/reduxPersist";
import { PersistGate } from "redux-persist/es/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
