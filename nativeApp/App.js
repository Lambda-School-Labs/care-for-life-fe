import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';

import SplashScreen from './screens/SpashScreen';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
  state = {
    client: null,
    loaded: false
  };

  // On mount, the app creates new Apollo server and restores Apollo cache
  // Note that an authorization header of 'Bearer <token>' is required in production
  async componentDidMount() {
    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: 'GraphQL endpoint here'
      // headers: {
      //   authorization: 'Bearer token'
      // }
    });
    const client = new ApolloClient({
      cache,
      link
    });

    try {
      await persistCache({
        cache,
        storage: AsyncStorage,
        trigger: 'background'
      });
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }

    this.setState({
      client,
      loaded: true
    });
  }

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <SplashScreen />;
    }

    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AppNavigator style={styles.container} />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
