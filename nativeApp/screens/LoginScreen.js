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
} from "react-native";
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

  const handleSubmit = async () => {
    //Expo Authentication
    let res = await promptAsync({ useProxy });
    console.log("Okta Response:", res);
    await AsyncStorage.setItem("TOKEN", res.params.code);
    setToken(res.params.code);
  };
  // Endpoint

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          {/* <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          /> */}
          <Button title="Log in" onPress={handleSubmit} />
          <View style={styles.footer}>
            <Text>Don't have an account?</Text>
            <Button
              title="Register"
              onPress={() => props.navigation.replace("Register")}
            />
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;
