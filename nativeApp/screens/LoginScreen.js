import React, { useState } from "react";
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
import Card from "../components/Card";
//Authentication Imports
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "expo";
import config from "../api/oktaConfig.js";
if (Platform.OS === "web") {
  WebBrowser.maybeCompleteAuthSession();
}

const useProxy = true;

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const discovery = AuthSession.useAutoDiscovery(
    "https://okta.careforlife.dev/oauth2/default"
  );
  // Request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    discovery
  );

  const handleSubmit = async () => {
    //Expo Authentication
    promptAsync({ useProxy });
  };
  // Endpoint

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
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
