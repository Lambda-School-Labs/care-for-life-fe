import React, { useState } from "react";
import {
  View,
  Button,
  AsyncStorage,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { ISSUER } from "react-native-dotenv";
import config from "../okta/index";
import styles from "../styles";
import { connect } from "react-redux";
import { resetResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

//configure as web platform to allow for Okta redirects
if (Platform.OS === "web") {
  WebBrowser.maybeCompleteAuthSession();
}
const useProxy = true;

function Login({ navigation, resetResponses }) {
  const [validToken, setValidToken] = useState(false);

  const discovery = AuthSession.useAutoDiscovery(ISSUER);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    discovery
  );

  //  Get Token
  const removeToken = async () => {
    return await AsyncStorage.removeItem("access_token");
  };
  const getToken = async () => {
    return await AsyncStorage.getItem("access_token");
  };

  const handleLogin = () => {
    console.log("loggin in...");
    getToken()
      .then(async (token) => {
        console.log("Got Token:", token);
        if (token !== null) {
          //check for token
          console.log("already logged in");
          setValidToken(true);
          //Navigates to Home Screen
          navigation.navigate("Home");
        } else {
          //Gets New Token
          await promptAsync({ useProxy }).then((res) => {
            // response from Okta
            console.log("res", res);
            AsyncStorage.setItem("id_token", res.params.id_token);
            setValidToken(true);
            //navigates to home screen
            navigation.navigate("Home");
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    console.log("logging out");
    resetResponses();
    Alert.alert(
      "Logging Out",
      "Are you sure you want to log out? \n You won't be able to sign back in while offline.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeToken();
            setValidToken(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.screen}>
      {validToken ? (
        <View>
          <Image
            source={require("../images/Care4Life.png")}
            style={{
              left: 25,
              bottom: 220,
            }}
          />
          <CustomButton
            title="Go to Home"
            onPress={() => navigation.push("Home")}
          />
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Image
            source={require("../images/Care4Life.png")}
            style={{
              left: 25,
              bottom: 250,
            }}
          />
          <CustomButton title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
}

export default connect(mapStateToProps, { resetResponses })(Login);
