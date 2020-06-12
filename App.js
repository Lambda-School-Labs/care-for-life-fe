import React from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";

const persistedStore = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
