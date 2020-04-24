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

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getToken = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("TOKEN");
        // console.log("userToken:", userToken);
        setToken(userToken);
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
    };
    getToken();
    props.navigation.navigate("Families", { setToken: setToken });
  }, [token]);

  const discovery = AuthSession.useAutoDiscovery(ISSUER);
  // Request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    discovery
  );

  const handleLogin = async () => {
    //Expo Authentication
    await promptAsync({ useProxy })
      .then((res) => {
        console.log("Okta Response:", res);
        console.log("setting token to async storage:", res.params.code);
        AsyncStorage.setItem("TOKEN", res.params.code);
      })
      .catch((e) => console.log(e));
    console.log("Checking token in storage....");
    const _retrieveToken = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN");
        if (token !== null) {
          // We have data!!
          console.log("token:", token);
          //set Data to state
          setToken(token);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveToken();
  };
  // Endpoint

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={logo} />
          </View>
          {/* <Button title="Log in" onPress={handleLogin} /> */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* <View style={styles.footer}>
            <Text>Don't have an account?</Text>
            <Button
              title="Register"
              onPress={() => props.navigation.replace("Register")}
            />
          </View> */}
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
    height: 125,
    width: "100%",
    backgroundColor: "black",
    textAlign: "center",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
