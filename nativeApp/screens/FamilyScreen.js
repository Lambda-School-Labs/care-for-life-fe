import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { annualSurvey } from "../surveys/annualSurvey.js";

const FamilyScreen = ({ route, navigation }) => {
  // Displays the family name
  // Ability to take surveys here

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Survey", {
              familyName: route.params.familyName,
              survey: annualSurvey,
              surveyName: "Family Annual Survey",
            })
          }
        >
          <Text style={styles.buttonText}>Annual Survey</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAlt}
          onPress={() =>
            navigation.navigate("FamilyMembers", {
              familyName: route.params.familyName,
              familyId: route.params.familyId,
            })
          }
        >
          <Text style={styles.buttonText}>Individual Survey</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Survey", {
              familyName: route.params.familyName,
              survey: annualSurvey,
              surveyName: "Family Annual Survey",
            })
          }
        >
          <Text style={styles.buttonText}>5 Year Survey</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAlt}
          onPress={() =>
            navigation.navigate("FamilyMembers", {
              familyName: route.params.familyName,
              familyId: route.params.familyId,
            })
          }
        >
          <Text style={styles.buttonText}>Medical Survey</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("FamilyMembers", {
              familyName: route.params.familyName,
            })
          }
        >
          <Text style={styles.buttonText}>Some Other Survey</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    borderRadius: 5,
    height: 150,
    backgroundColor: "#333",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 1,
    shadowRadius: 10.35,
    elevation: 19,
  },
  buttonAlt: {
    width: "100%",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#9F1B37",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
  },
});

export default FamilyScreen;
