import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
//import { createConfig, isAuthenticated, getUser, getUserFromIdToken } from "@okta/okta-react-native";
import config from '../okta/index';
import styles from "../styles";
import { CLIENT_ID, ISSUER, REDIRECT_URI, IP } from 'react-native-dotenv';
import axios from 'axios';

export default function HomeScreen({ route, navigation }) {

  const { idToken } = route.params;
  const { accessToken } = route.params;


  const getUserInfo = () => {
    console.log('id token', idToken)
    console.log('access token', accessToken)
    axios.get(`http://${IP}:5600/auth/login`, {
      headers: {
        Authorization: `${idToken}`
      }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getUserInfo();
  }, [])

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
