import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { annualSurvey } from "../surveys/annualSurvey.js";

const FamilyScreen = ({ route, navigation }) => {
  // Displays the family name
  // Ability to take surveys here

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Button for the anuual survey
        Takes you to the survey screen
        Passes the family name, the survey and the survey type as params
        Will display the annual survey that is passed as params  */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Survey", {
              familyName: route.params.familyName,
              survey: annualSurvey,
              type: "Family",
            })
          }
        >
          <Text style={styles.buttonText}>Annual Survey</Text>
        </TouchableOpacity>
      </View>
      {/* Button for a future survey. Just a placeholder */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAlt}
          onPress={() =>
            navigation.navigate("FamilyMembers", {
              familyName: route.params.familyName,
            })
          }
        >
          <Text style={styles.buttonText}>Some Other Survey</Text>
        </TouchableOpacity>
      </View>
      {/* Button for the individual survey
      Takes you to the family member screen so you can choose 
      who is taking the survey 
      passes the family name and id
      */}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-around",
    flex: 1,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    height: 200,
    backgroundColor: "black",
  },
  buttonAlt: {
    width: "100%",
    justifyContent: "center",
    height: 200,
    backgroundColor: "seagreen",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
  },
});

export default FamilyScreen;
