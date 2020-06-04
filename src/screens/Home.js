import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { createConfig, isAuthenticated, getUser, getUserFromIdToken } from "@okta/okta-react-native";
import config from '../okta/index';
import styles from "../styles";
import { CLIENT_ID, ISSUER, REDIRECT_URI } from 'react-native-dotenv';

export default function HomeScreen({ route, navigation }) {

  //const [authenticated, setAuthenticated] = useState(false)

  //const { idToken } = route.params;

  const getUserInfo = async () => {
    //console.log(idToken)
    let user = await getUser()
      .then(res => console.log(res))
      .catch(err => console.log(err))
    console.log('****', JSON.stringify(user))
  }

  useEffect(() => {
    //console.log("***id token ***", idToken)
    createConfig({
      clientId: CLIENT_ID,
      redirectUri: config.redirectUri,
      endSessionRedirectUri: REDIRECT_URI,
      discoveryUri: ISSUER,
      scopes: config.scopes,
      requireHardwareBackedKeyStore: false,
    });
    checkAuthentication();
    getUserInfo();

  }, [])

  const checkAuthentication = async () => {
    const result = await isAuthenticated()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    // if (result.authenticated !== authenticated) {
    //   setAuthenticated(!authenticated)
    // }
  }

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
