import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Family Form"
        onPress={() => navigation.push("FamilyForm")}
      />

      {/* <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
      {/* <Button
        title="Go to Details...again"
        onPress={() => navigation.push("Details")}
      /> */}
    </View>
  );
}
