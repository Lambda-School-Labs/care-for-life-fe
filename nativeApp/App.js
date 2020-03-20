import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import apolloClient from './apollo';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // load assets here
      ]),
      Font.loadAsync({
        // load fonts here
      })
    ]);
  };

  handleLoadingError = () => {
    // Any error handling can be done here
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  componentDidMount() {
    const client = apolloClient();
    this.setState({
      client
    });
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <View style={styles.container}>
            <Text>Care For Life - A New Hope</Text>
          </View>
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
