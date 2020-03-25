import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const SurveyScreen = ({ navigation }) => {
  const progressNumber = 0.0;
  return (
    <View style={styles.container}>
      <Text>Survey goes here</Text>
      <Button
        title="Complete the survey"
        onPress={() => navigation.navigate("SurveyCompleted")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bar: {
    margin: 20,
    width: "80%"
  }
});

export default SurveyScreen;
