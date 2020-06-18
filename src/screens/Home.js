import React, { useState, useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "../styles";
import axios from "axios";
import CustomButton from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../actions/userActions";

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const getIdToken = async () => {
    return await AsyncStorage.getItem("id_token");
  };

  const getRegisteredUserInfo = () => {
    axios
      .get("https://care-for-life.herokuapp.com/api/workers")
      .then(async (res) => {
        const currentUser = await res.data.filter((e, i) => e.email === email);
        await dispatch(saveUser(currentUser[0]));
      })

      .catch((err) => console.log(err));
  };

  const getUserInfo = async () => {
    const idToken = await getIdToken();
    axios
      .get(`https://care-for-life.herokuapp.com/auth/login`, {
        headers: {
          Authorization: `${idToken}`,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
        if (!res.data.isRegistered) {
          navigation.navigate("Register", { userInfo: res.data });
        } else {
          getRegisteredUserInfo();
          console.log("already registered");
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    /// gets all of the users info
    getUserInfo();
  }, []);

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
