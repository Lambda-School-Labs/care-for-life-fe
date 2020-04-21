import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ApolloOfflineProvider } from "react-offix-hooks";
import { offlineClient } from "./config/offix";
import SplashScreen from "./screens/SpashScreen";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState(null);

  // initialize the offix client and set the apollo client
  useEffect(() => {
    offlineClient.init().then(() => setInitialized(true));
  }, []);

  // load the app if the apolloClient is there, otherwise load the splash screen
  if (initialized) {
    return (
      <ApolloOfflineProvider client={offlineClient}>
        <ApolloProvider client={offlineClient}>
          {token === null ? (
            <AuthNavigator />
          ) : (
            <AppNavigator style={styles.container} />
          )}
        </ApolloProvider>
      </ApolloOfflineProvider>
    );
  }
  return <SplashScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
