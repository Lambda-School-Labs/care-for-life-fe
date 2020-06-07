import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { IP } from 'react-native-dotenv';
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
      .catch(err => console.log(err.message))
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
