import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { ApolloOfflineClient } from 'offix-client';
import { NetworkStatus } from './NetworkStatus';
import 'cross-fetch/polyfill';

const cacheStorage = {
  getItem: async (key) => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === 'string') {
      // console.log('Get item string', data);
      return JSON.parse(data);
    }
    // console.log('Get item', data);
    return data;
  },
  setItem: (key, value) => {
    let valueStr = value;
    if (typeof valueStr === 'object') {
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

// const token = process.env.APOLLO_TOKEN;
const token =
  'eyJraWQiOiI0dFJQSzU1STVkaW9TYi1la2xEQW9Ba0Zpb0piNWlCSjJsU3k0Z0J0OHpvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnUzQkxfWFlnWWUxYXZMNndCOFpFUDRGWWZJaGNIa2hGcXJKYUp0QXlVRFkiLCJpc3MiOiJodHRwczovL29rdGEuY2FyZWZvcmxpZmUuZGV2L29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU4NzM5OTE0OSwiZXhwIjoxNTg3NDAyNzQ5LCJjaWQiOiIwb2E1aXhoaDJKODl3V0F6ZDR4NiIsInVpZCI6IjAwdTVpdzR2YXo2UldTbjk5NHg2Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.PE3r35eucsuk9E5WoPCVdY-5yxqJqBIqf9nBadOD23tg6YeEhfhKTIFTdyF8lf9dzrWGIRDiwaYmjU34lFIl20GVJGKDDvwiBw1uYBW7C97b5KjnvdvF-Ont5gO4wdSBUh5Rl4O4fm3CofZ9OR0zzDScHdxMITg0rrG7jUIMgIucBVF6p-Sbk_J3IiZ_OPVMzAp-xBvnPmt9mlWVK1-UhfTqO7bwzsO1wPeoYcgWqK8xBbpZE44-JunZy8EM5em41MGIY7a7W89r5lIYRu3kye_RjlGFNDhF0Gx28Gf5G5-PfUWwOgqRi9lxC-Zul_P3XRtqhq2tWTXgGbeDqVEa5Q';

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://apollo.careforlife.dev',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
});

// offlineClient.registerOfflineEventListener({
//   onOperationEnqueued(operation) {
//     // called when operation was placed on the queue
//     // console.log("onOperationEnqueued", operation);
//   },
//   onOperationFailure: (operation, error) => {
//     // called when the operation failed
//     console.log("onOperationFailure", error);
//     return;
//   },
//   onOperationSuccess: (operation) => {
//     // called when the operation was fulfilled
//     // console.log("onOperationSuccess", operation);
//   },
//   onOperationRequeued: (operation) => {
//     // called when an operation was loaded in from storage and placed back on the queue
//     // This would happen across app restarts
//     // console.log("onOperationRequeued", operation);
//   },
//   queueCleared() {
//     // called when all operations are fulfilled and the queue is cleared
//     // console.log("queuecleared");
//   },
// });
