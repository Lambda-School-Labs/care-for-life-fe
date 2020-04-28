import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";
import { ApolloOfflineClient } from "offix-client";
import { NetworkStatus } from "./NetworkStatus";
import { APOLLO_TOKEN, APOLLO_URI } from "react-native-dotenv";
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

const authLink = setContext((_, { headers }) => {
  // get the Apollo authentication token from async storage if it exists
  // console.log("APOLLO TOKEN IN ASYNC STORAGE:", token);
  // let AccessToken;
  // getToken()
  //   .then((token) => {
  //     AccessToken = token;
  //     // console.log("State of Token In Offix.js:", AccessToken);
  //   })
  //   .catch();
  // return the headers to the context so httpLink can read them
  // console.log("HEADERS IN OFFIX.JS:");
  return {
    headers: {
      ...headers,
      // authorization: `Bearer ${AccessToken}`,
      authorization:
        "Bearer eyJraWQiOiI0dFJQSzU1STVkaW9TYi1la2xEQW9Ba0Zpb0piNWlCSjJsU3k0Z0J0OHpvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkhPNTF0ZVp2alN2MkNqWXA2YkV3eS1vSFJYb2VQZVpoNHdJSnZFNmRVUXMiLCJpc3MiOiJodHRwczovL29rdGEuY2FyZWZvcmxpZmUuZGV2L29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU4ODExMTgxMywiZXhwIjoxNTg4MTk4MjEzLCJjaWQiOiIwb2FhYmZocTZncGdVTGp6cjR4NiIsInVpZCI6IjAwdWE3cGY0NjdlQUNHdlFHNHg2Iiwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwic3ViIjoiYWxleGlzZGF2YWxvcy50ZWNoQGdtYWlsLmNvbSJ9.PEs6r00WnDST2kiZmoKAZwpv0p1GfYp2YCif4IQTi3qIRyLKbLK606I9d0L1Lv706AiCPmsJoGllQffmM5uS5liJ10pn5vVdhilllIthr2ux-e4aI2a53TkZO7NTvujgq0HPPxajqA86VJosV7HNyaGGeXdL4cc6G271_z6WqV_3TrCLzUjQAgqSppq7aYtZC4Q58_E-x1B-pjMLluGAsbMjgQVEbylv884X5hOz4_9Gw0HGDWqLBgkzUxOrGHxEMnjw-Wu55T-zLaIgxDnlzGe8YgHYDI5torbHd_245iktjJ7ZE-NW-mlF-7nCcArXsjv-zKT2Trggek9Pb0vpjw",
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
  onOperationEnqueued(operation) {
    // called when operation was placed on the queue
    // console.log("onOperationEnqueued", operation);
  },
  onOperationFailure: (operation, error) => {
    // called when the operation failed
    // console.log("onOperationFailure", error);
    // return;
  },
  onOperationSuccess: (operation) => {
    // called when the operation was fulfilled
    // console.log("onOperationSuccess", operation);
  },
  onOperationRequeued: (operation) => {
    // called when an operation was loaded in from storage and placed back on the queue
    // This would happen across app restarts
    // console.log("onOperationRequeued", operation);
  },
  queueCleared() {
    // called when all operations are fulfilled and the queue is cleared
    // console.log("queuecleared");
  },
});
