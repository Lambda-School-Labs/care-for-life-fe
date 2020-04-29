import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Alert,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/images/CFL_logo.jpg";
import { ISSUER } from "react-native-dotenv";
import Card from "../components/Card";
//Authentication Imports
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "expo";
import config from "../api/oktaConfig.js";
import { useOfflineMutation } from "react-offix-hooks";
//mutations
import { loginMutation } from "../Queries/queries.js";
//configure as web platform to allow for Okta redirects
if (Platform.OS === "web") {
  WebBrowser.maybeCompleteAuthSession();
}
const useProxy = true;
const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  //Offline Mutation
  const [login, state] = useOfflineMutation(loginMutation);
  const discovery = AuthSession.useAutoDiscovery(ISSUER);
  // Request

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    discovery
  );
  //Logout Logic
  const handleLogout = async () => {
    console.log("Logging out...");
    Alert.alert(
      "Logging Out",
      "Are you sure you want to log out? \n You won't be able to sign back in OFFLINE!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            AsyncStorage.removeItem("TOKEN");
          },
        },
      ],
      { cancelable: false }
    );
  };
  //Login Logic
  const handleLogin = async () => {
    await AsyncStorage.getItem("TOKEN")
      .then((res) => {
        console.log("Token In Async Storage:", res);
        if (res !== null) {
          props.navigation.replace("Families");
        } else {
          //Expo Authentication
          promptAsync({ useProxy })
            .then((res) => {
              console.log("Okta Response:", res);
              console.log("setting token to async storage:", res.params.code);
              AsyncStorage.setItem("TOKEN", res.params.code);
              setToken(res.params.code);

              // login({
              //   variables: {
              //     //variables to match backend
              //   },
              // });

              props.navigation.replace("Families");
            })
            .catch((err) => Alert.alert(`Could Not Log In, Error: \n ${err}`));
        }
      })
      .catch((err) => console.log(err));
  };
  // Endpoint

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={logo} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: "75%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 100,
    width: "100%",
    backgroundColor: "black",
    textAlign: "center",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    margin: 5,
  },
  buttonText: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "space-around",
  },
  barContinerText: {
    fontSize: 25,
    padding: 5,
  },
});

export default LoginScreen;
