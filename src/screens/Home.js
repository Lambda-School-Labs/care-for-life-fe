import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
//import { createConfig, isAuthenticated, getUser, getUserFromIdToken } from "@okta/okta-react-native";
import config from '../okta/index';
import styles from "../styles";
import { CLIENT_ID, ISSUER, REDIRECT_URI, IP } from 'react-native-dotenv';
import axios from 'axios';

export default function HomeScreen({ route, navigation }) {

  //const [authenticated, setAuthenticated] = useState(false)

  const { idToken } = route.params;
  const { accessToken } = route.params;


  const getUserInfo = () => {
    console.log('id token', idToken)
    console.log('access token', accessToken)
    // axios.post(`https://dev-815303.okta.com/oauth2/default/v1/introspect?client_id=${CLIENT_ID}&token=${idToken}&token_type_hint=id_token`, {
    //   headers: {
    //     Authorization: accessToken,
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   }
    // })
    // axios.get('https://care-for-life.herokuapp.com/api/zones')
    axios.get(`http://${IP}:5600/login`, {
      headers: {
        Authorization: `${idToken}`
      }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    //console.log("***id token ***", idToken)
    // createConfig({
    //   clientId: CLIENT_ID,
    //   redirectUri: config.redirectUri,
    //   endSessionRedirectUri: REDIRECT_URI,
    //   discoveryUri: ISSUER,
    //   scopes: config.scopes,
    //   requireHardwareBackedKeyStore: false,
    // });
    // checkAuthentication();
    getUserInfo();

  }, [])

  // const checkAuthentication = async () => {
  //   const result = await isAuthenticated()
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  //   if (result.authenticated !== authenticated) {
  //     setAuthenticated(!authenticated)
  //   }
  // }

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
