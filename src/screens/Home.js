import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Button
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
