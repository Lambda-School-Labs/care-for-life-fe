import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { StyleSheet } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ApolloOfflineProvider } from "react-offix-hooks";
import { offlineClient } from "./config/offix";
import SplashScreen from "./screens/SpashScreen";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  const [initialized, setInitialized] = useState(false);

  // const discovery = AuthSession.useAutoDiscovery({ ISSUER });

  // // Create and load an auth request:
  // const [request, result, promptAsync] = AuthSession.useAuthRequest(
  //   {
  //     clientId: { CLIENT_ID },
  //     redirectUri: { DEV_URI },
  //     scopes: ["openid", "profile", "email", "offline_access"],
  //   },
  //   discovery
  // );

  // initialize the offix client and set the apollo client
  useEffect(() => {
    offlineClient.init().then(() => setInitialized(true));
  }, []);

  // load the app if the apolloClient is there, otherwise load the splash screen
  if (initialized) {
    return (
      <ApolloOfflineProvider client={offlineClient}>
        <ApolloProvider client={offlineClient}>
          <AppNavigator style={styles.container} />
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
