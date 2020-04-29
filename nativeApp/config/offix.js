import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";
import { ApolloOfflineClient } from "offix-client";
import { NetworkStatus } from "./NetworkStatus";
import { APOLLO_TOKEN, APOLLO_URI } from "react-native-dotenv";
import { Alert } from "react-native";
import "cross-fetch/polyfill";
const getToken = async () => {
  return await AsyncStorage.getItem("access_token");
};
const cacheStorage = {
  getItem: async (key) => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === "string") {
      // console.log('Get item string', data);
      return JSON.parse(data);
    }
    // console.log('Get item', data);
    return data;
  },
  setItem: (key, value) => {
    let valueStr = value;
    if (typeof valueStr === "object") {
      valueStr = JSON.stringify(value);
    }
    // console.log('Set item', valueStr);
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

const networkStatus = new NetworkStatus();

const httpLink = new HttpLink({
  uri: APOLLO_URI,
});

const authLink = setContext(async (_, { headers }) => {
  // get the Apollo authentication token from async storage if it exists
  const token = await AsyncStorage.getItem("access_token");
  console.log("Token In AuthLink:", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  // uri: "https://apollo.careforlife.dev",
  // headers: {
  //   authorization: `Bearer ${token}`,
  // },
  // }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
});

offlineClient.registerOfflineEventListener({
  onOperationEnqueued(operation, error) {
    // called when operation was placed on the queue
    console.log("onOperationEnqueued", operation, error);
  },
  onOperationFailure: (operation, error) => {
    // called when the operation failed
    console.log("onOperationFailure", error, operation);
  },
  onOperationSuccess: (operation, error) => {
    // called when the operation was fulfilled
    console.log("onOperationSuccess", operation, error);
  },
  onOperationRequeued: (operation, error) => {
    // called when an operation was loaded in from storage and placed back on the queue
    // This would happen across app restarts
    console.log("onOperationRequeued", operation, error);
  },
  queueCleared() {
    // called when all operations are fulfilled and the queue is cleared
    console.log("queuecleared");
  },
});
