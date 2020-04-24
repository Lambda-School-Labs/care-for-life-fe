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

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    // const getToken = async () => {
    //   let userToken;
    //   try {
    //     userToken = await AsyncStorage.getItem("userToken");
    //     console.log("userToken:", userToken);
    //   } catch (e) {
    //     // Restoring token failed
    //     console.log(e);
    //   }
    //   // After restoring token, we may need to validate it in production apps
    //   // This will switch to the App screen or Auth screen and this loading
    //   // screen will be unmounted and thrown away.
    //   setToken(userToken);
    // };
    // getToken();
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
