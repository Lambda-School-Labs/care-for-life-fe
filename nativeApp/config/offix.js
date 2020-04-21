import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { AsyncStorage } from "react-native";
import { ApolloOfflineClient } from "offix-client";
import { NetworkStatus } from "./NetworkStatus";
import { APOLLO_TOKEN } from "react-native-dotenv";
import "cross-fetch/polyfill";

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

const token = APOLLO_TOKEN;

// const token =
//   "eyJraWQiOiI0dFJQSzU1STVkaW9TYi1la2xEQW9Ba0Zpb0piNWlCSjJsU3k0Z0J0OHpvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULi1UbjJOc08wZmdNODY2RWZDZHZCbWtVRWpNaUFqdkUwTnJGQmk3OV96VWciLCJpc3MiOiJodHRwczovL29rdGEuY2FyZWZvcmxpZmUuZGV2L29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU4NzQ3OTEwOCwiZXhwIjoxNTg3NTY1NTA4LCJjaWQiOiIwb2E1aXhoaDJKODl3V0F6ZDR4NiIsInVpZCI6IjAwdTVpdzR2YXo2UldTbjk5NHg2Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.n5UHnWfmVHsrFqOhujVNSXFxSz7H6rjrN2_0hyuZ8cFv-q4Y6JYHEDvbRXRwp3Saw9ZbbCNyC_3AFSpxtriRAKm70RRgdtouLqEOsPnI6YCgi19AgFEgW6MYi6nfzAaXDnXxriPPnZjmG03omJLbkpy3HoE3MiiIIdlYYFZ17V9YdzcOMdVvdnobp-MRljtGP54FxHXXKO1yekvrbj6699FL4e5eKkgwQfZGVXdbLQPss35jehvLuiD14Nv3Q9lXDdAVP-tNksnZND6fhD-35kTUqeioqpls2Up0ATvbrZ-GGUiYY5a6-XeFvQqiqD9zPtJl2Xza86PftnRV97a65Q";

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://apollo.careforlife.dev",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
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
    console.log("onOperationFailure", error);
    return;
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
