import React, { useState, useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "../styles";
import axios from 'axios';
import CustomButton from "../components/Button";
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../actions/userActions'

export default function HomeScreen({ navigation }) {

  const [email, setEmail] = useState('')
  const [user, setUser] = useState({})

  const storedUser = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const getIdToken = async () => {
    return await AsyncStorage.getItem('id_token')
  }

  const getRegisteredUserInfo = () => {
    axios.get('https://care-for-life.herokuapp.com/api/workers')
      .then(res => {
        const currentUser = res.data.filter((e, i) => e.email === email)
        setUser(currentUser[0])
        // console.log('CURRENTUSER', user)
        dispatch(saveUser({
          id: user.id,
          community_id: user.community_id,
          zone_id: user.zone_id,
          email: user.email
        }))
        console.log('stored user from redux *', storedUser)
      })
      .catch(err => console.log(err))
  }

  const getUserInfo = async () => {
    const idToken = await getIdToken()
    console.log('id token', idToken)
    axios.get(`https://care-for-life.herokuapp.com/auth/login`, {
      headers: {
        Authorization: `${idToken}`
      }
    })
      .then(res => {
        console.log(res.data)
        setEmail(res.data.email)
        if (!res.data.isRegistered) {
          navigation.navigate('Register', { userInfo: res.data })
        } else {
          getRegisteredUserInfo()
          console.log('already registered')
        }
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
