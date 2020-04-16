import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { AsyncStorage } from "react-native";
import { ApolloOfflineClient } from "offix-client";
import { NetworkStatus } from "./NetworkStatus";
import "cross-fetch/polyfill";

const cacheStorage = {
  getItem: async (key) => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === "string") {
      console.log("Get item string", data);
      return JSON.parse(data);
    }
    console.log("Get item", data);
    return data;
  },
  setItem: (key, value) => {
    let valueStr = value;
    if (typeof valueStr === "object") {
      valueStr = JSON.stringify(value);
    }
    console.log("Set item", valueStr);
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

const networkStatus = new NetworkStatus();

const token =
  "eyJraWQiOiI0dFJQSzU1STVkaW9TYi1la2xEQW9Ba0Zpb0piNWlCSjJsU3k0Z0J0OHpvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlZkckc3OUc3R2xQbHlQdnVpUW9TTHIzSGNkRlg0TEQ5b1RQWndRbHBfa0kiLCJpc3MiOiJodHRwczovL29rdGEuY2FyZWZvcmxpZmUuZGV2L29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU4NzA2MTg4OCwiZXhwIjoxNTg3MDY1NDg4LCJjaWQiOiIwb2E1aXhoaDJKODl3V0F6ZDR4NiIsInVpZCI6IjAwdTVpdzR2YXo2UldTbjk5NHg2Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.n5fE6yQ0YqKKxCVo5cGM9NRGnsDh6gl_c1TJuUYUfvWipiRehRNt4e--pETiyEmyyiX7f_-iTJjg3P9pEMT5MrhD-H8FRGflARJEHQprp7VTiyylEyIdTvMgivHh6qfKdJi_ksaO1Z4KawDRfpNUf4pizo18jgbkJkHLNk9s0GZzPsy5YHRciEzKRIfFV0Z514jGJqmoVKC67dfXOtPLY92fCfDjgWIC0mrZeTJxhO_6Ydb9PwuP-dlLbfmd_WdazZwR23e9qHNz3ji1-DTheQdtgJRPQAPvLIsfI-4ABjolF76QLEqc7UsbuZ-5IdQ0lZG5QH3qQ_HDurDWXg8n6Q"; // TODO

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://apollo.careforlife.dev",
    headers: {
      authorization: `Bearer ${token}`,
    },
    // request: (operation) => {
    //   operation.setContext({
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   });
    // },
  }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
});

offlineClient.registerOfflineEventListener({
  onOperationEnqueued(operation) {
    // called when operation was placed on the queue
    console.log("onOperationEnqueued", operation);
  },
  onOperationFailure: (operation, error) => {
    // called when the operation failed
    console.log("onOperationFailure", operation, error);
  },
  onOperationSuccess: (operation) => {
    // called when the operation was fulfilled
    console.log("onOperationSuccess", operation);
  },
  onOperationRequeued: (operation) => {
    // called when an operation was loaded in from storage and placed back on the queue
    // This would happen across app restarts
    console.log("onOperationRequeued", operation);
  },
  queueCleared() {
    // called when all operations are fulfilled and the queue is cleared
    console.log("queuecleared");
  },
});
