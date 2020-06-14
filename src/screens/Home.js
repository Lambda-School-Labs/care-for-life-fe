import React, { useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "../styles";
import axios from 'axios';
import CustomButton from "../components/Button";

export default function HomeScreen({ navigation }) {

  const getIdToken = async () => {
    return await AsyncStorage.getItem('id_token')
  }

  const getUserInfo = async () => {
    const idToken = await getIdToken()
    axios.get(`https://care-for-life.herokuapp.com/auth/login`, {
      headers: {
        Authorization: `${idToken}`
      }
    })
      .then(res => {
        // if (!res.data.isRegistered) {
        //   navigation.navigate('Register', { userInfo: res.data })
        // }
        // navigation.navigate(next page, { user = res.data })
      })
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
