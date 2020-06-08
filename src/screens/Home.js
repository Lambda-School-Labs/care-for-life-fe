import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import axios from 'axios';
import CustomButton from "../components/Button";

export default function HomeScreen({ route, navigation }) {

  const { idToken } = route.params;
  const { accessToken } = route.params;

  const getUserInfo = () => {
    console.log('id token', idToken)
    console.log('access token', accessToken)
    axios.get(`https://care-for-life.herokuapp.com/auth/login`, {
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
      <CustomButton
        title="Go to Families"
        onPress={() => navigation.navigate("Families")}
      />
    </View>
  );
}

// Extra Button Commands for reference

{
  /* <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */
}
{
  /* <Button
        title="Go to Home...again"
        onPress={() => navigation.push("Home")}
      /> */
}
