import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
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

const token = 'IMPLEMENT BACKEND AUTHORIZATION TOKEN HERE'; // TODO

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://apollo.careforlife.dev',
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
  }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
});
