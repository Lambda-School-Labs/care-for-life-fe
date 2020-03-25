import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Bar } from "react-native-progress";
import ProgressBar from "@kcodev/react-native-progress-bar";

const SurveyCompletedScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0.55);

  useEffect(() => {}, [progress]);

  return (
    <View style={styles.container}>
      <Text>Survey completed</Text>
      <Bar
        style={styles.bar}
        progress={progress}
        width={400}
        color={"#333"}
        borderWidth={2}
        borderColor={"black"}
        useNativeDriver={true}
      />
      <ProgressBar
        value={70}
        maxValue={100}
        backgroundColorOnComplete="#333"
        backgroundColor="#333"
      />
      {/* Buttons */}
      <Text>Progress: {progress * 100} %</Text>
      <View style={styles.button}>
        <Button title="Set To 100%" onPress={() => setProgress(1.0)} />
      </View>
      <View style={styles.button}>
        <Button title="Set To 75%" onPress={() => setProgress(0.75)} />
      </View>
      <View style={styles.button}>
        <Button title="Set To 50%" onPress={() => setProgress(0.5)} />
      </View>
      <View style={styles.button}>
        <Button title="Set To 25%" onPress={() => setProgress(0.25)} />
      </View>
      <View style={styles.button}>
        <Button
          title="Go home"
          onPress={() => navigation.navigate("SurveyHome")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bar: {
    margin: 20,
  },
  button: {
    width: "80%",
    margin: 10
  }
});

export default SurveyCompletedScreen;
