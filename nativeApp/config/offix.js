import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { ApolloOfflineClient } from 'offix-client';
import { NetworkStatus } from './NetworkStatus';
import fetch from 'node-fetch';

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

const token = 'IMPLEMENT BACKEND TOKEN HERE'; // TODO

export const offlineClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://apollo.careforlife.dev',
    headers: {
      authorization: `Bearer ${token}`,
      fetch: fetch,
    }, // Note that an authorization header of 'Bearer <token>' is required in production
  }),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
});
