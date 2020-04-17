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
      console.log('Get item string', data);
      return JSON.parse(data);
    }
    console.log('Get item', data);
    return data;
  },
  setItem: (key, value) => {
    let valueStr = value;
    if (typeof valueStr === 'object') {
      valueStr = JSON.stringify(value);
    }
    console.log('Set item', valueStr);
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

const networkStatus = new NetworkStatus();

const token =
  'eyJraWQiOiI0dFJQSzU1STVkaW9TYi1la2xEQW9Ba0Zpb0piNWlCSjJsU3k0Z0J0OHpvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULms0anB4bE9DT3FINmc0d2NLbGF4MHE4LXhQQ0J1d0k1ZFhhREVyTDd6ODQiLCJpc3MiOiJodHRwczovL29rdGEuY2FyZWZvcmxpZmUuZGV2L29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU4NzE0MzQ2NiwiZXhwIjoxNTg3MTQ3MDY2LCJjaWQiOiIwb2E1aXhoaDJKODl3V0F6ZDR4NiIsInVpZCI6IjAwdTVpdzR2YXo2UldTbjk5NHg2Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.pMV7G3rzPHKWZHoraAUwimuVQmdBoDfNxka31HSnisamv7KfHYwyTcLPjSBtAmhhWugc8XeK8rOWteV-VwWHrtWLXGBaTfx_Q0XH0xferGVYv37jPe8sRUbxyN5dYTViV93wiWsn5qhMGErhKIGrXDnppORl1HgDPDS-jpqjm_ppuPSFTCMjaueSIGayKOcn9mjL_rTXHXjVNFuUTxU4is-13Tjv-g_NiP0y6klfFXU2_Iq3Nu1nSZcL_grBU2VkI7A1bBXAV-xJZ8Q05cDKdui57ATefwSK2uQwnya6qgXPl39uOCX7xNfr7ooG5LeWLYwEtV1vC02k_-Fu2X6fVA';

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://apollo.careforlife.dev',
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
