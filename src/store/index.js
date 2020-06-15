import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import familyReducer from "../reducers/familiesReducer";
import familyFormReducer from "../reducers/familyFormReducer";
import surveyReducer from "../reducers/surveyReducer";
import { persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import AsyncStorage from "@react-native-community/async-storage";

const rootReducer = combineReducers({
  userReducer: userReducer,
  familyReducer: familyReducer,
  familyFormReducer: familyFormReducer,
  surveyReducer: surveyReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "userReducer",
    "familyReducer",
    "familyFormReducer",
    "surveyReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, createLogger())
);

export default store;
