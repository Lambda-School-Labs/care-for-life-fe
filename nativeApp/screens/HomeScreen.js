import React from "react";
import { StyleSheet, View, Text } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Annual Survey</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default HomeScreen;
