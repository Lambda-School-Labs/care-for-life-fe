import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details...again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
