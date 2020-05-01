import React from "react";
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import SurveyScreen from "../screens/SurveyScreen";
import SurveyCompletedScreen from "../screens/SurveyCompletedScreen";
import Header from "../components/Header/index";
import AllFamiliesScreen from "../screens/AllFamiliesScreen";
import FamilyScreen from "../screens/FamilyScreen";
import FamilyMembers from "../screens/FamilyMembersScreen";
import Login from "../screens/LoginScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Stack = createStackNavigator();

const LogoutAlert = (navigation) => {
  return Alert.alert(
    `Warning!`,
    "You will not be able to sign back in while offline\n Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          AsyncStorage.removeItem("access_token");
          navigation.navigate("Login");
        },
      },
    ],
    { cancelable: false }
  );
};
const LogoutButton = (navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.buttonContainer}
      onPress={() => LogoutAlert(navigation)}
    >
      <Text styles={{ color: "white" }}>Log Out</Text>
      <FontAwesome5 name="sign-out-alt" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Defaults to first screen in stack. Login screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        {/* Lists out all families */}
        <Stack.Screen
          name="Families"
          component={AllFamiliesScreen}
          options={({ navigation }) => ({
            title: "Families",
            headerRight: () => LogoutButton(navigation),
            headerStyle: { backgroundColor: "#9F1B37" },
            headerTitleStyle: { color: "white" },
          })}
        />
        {/* Family screen displays buttons to take surveys */}
        <Stack.Screen
          name="Family"
          component={FamilyScreen}
          options={({ route, navigation }) => ({
            title: `${route.params.familyName} Family`,
            headerRight: () => LogoutButton(navigation),
            headerStyle: { backgroundColor: "#9F1B37" },
            headerTitleStyle: { color: "white" },
          })}
        />
        {/* Lists out all family members */}
        <Stack.Screen
          name="FamilyMembers"
          component={FamilyMembers}
          options={({ route, navigation }) => ({
            title: `${route.params.familyName} Family Members`,
            headerRight: () => LogoutButton(navigation),
            headerStyle: { backgroundColor: "#9F1B37" },
            headerTitleStyle: { color: "white" },
          })}
        />
        {/* Displays the survey being taken */}
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={({ route, navigation }) => ({
            title: `${route.params.surveyName}`,
            headerRight: () => LogoutButton(navigation),
            headerStyle: { backgroundColor: "#9F1B37" },
            headerTitleStyle: { color: "white" },
          })}
        />
        {/* Displays survey results */}
        <Stack.Screen
          name="SurveyCompleted"
          component={SurveyCompletedScreen}
          options={({ navigation }) => ({
            title: "Results",
            headerRight: () => LogoutButton(navigation),
            headerStyle: { backgroundColor: "#9F1B37" },
            headerTitleStyle: { color: "white" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 100,
    height: "100%",
    color: "white",
  },
  buttonText: {
    color: "white",
  },
});
