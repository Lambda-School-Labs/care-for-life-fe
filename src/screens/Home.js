import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";

export default function HomeScreen({ route, navigation }) {

  const { idToken } = route.params;

  useEffect(() => {
    console.log("***id token ***", idToken)
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
