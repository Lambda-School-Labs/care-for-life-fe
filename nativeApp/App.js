import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { StyleSheet } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ApolloOfflineProvider } from "react-offix-hooks";
import { offlineClient } from "./config/offix";
import SplashScreen from "./screens/SpashScreen";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import LoginScreen from "./screens/LoginScreen.js";
import { Alert } from "react-native";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState(false);

  // initialize the offix client and set the apollo client
  useEffect(() => {
    const runApp = async () => {
      console.log("App Starting");
      await offlineClient.init().then(() => setInitialized(true));
      //removes yellow errors/warnings
      console.disableYellowBox = true;
    };
    runApp();
    //Offix Event Listeners
    offlineClient.registerOfflineEventListener({
      onOperationEnqueued(operation, error) {
        // called when operation was placed on the queue
        // console.log("onOperationEnqueued", operation, error);
      },
      onOperationFailure: (operation, error) => {
        // called when the operation failed
      },
      onOperationSuccess: (operation, error) => {
        // called when the operation was fulfilled
        // console.log("onOperationSuccess", operation, error);
      },
      onOperationRequeued: (operation, error) => {
        // called when an operation was loaded in from storage and placed back on the queue
        // This would happen across app restarts
        // console.log("onOperationRequeued", operation, error);
      },
      queueCleared() {
        // called when all operations are fulfilled and the queue is cleared
        // console.log("queuecleared");
        Alert.alert(
          `Upload Success`,
          `All Survey Data Uploaded Successfully: Queue Is Empty`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              // onPress: () => console.log("Okay Pressed"),
            },
          ],
          { cancelable: false }
        );
      },
    });
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
