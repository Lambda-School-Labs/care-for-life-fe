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
  //Get Token
  const getToken = async () => {
    return await AsyncStorage.getItem("access_token");
  };
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
            AsyncStorage.removeItem("access_token");
          },
        },
      ],
      { cancelable: false }
    );
  };
  //Login Logic
  const handleLogin = () => {
    console.log("loggin in...");
    getToken()
      .then(async (token) => {
        if (token !== null) {
          //Check if token is valid
          //Ping Backend to validate token

          //Navigates to Families Screen
          console.log("Token:", token);
          props.navigation.replace("Families");
        } else {
          //Gets New Token
          await promptAsync({ useProxy }).then((res) => {
            AsyncStorage.setItem("access_token", response.params.access_token);
            //navigates to families screen
            props.navigation.replace("Families");
          });
        }
      })
      .catch();
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
