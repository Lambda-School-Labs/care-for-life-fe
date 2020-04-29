import React from "react";

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

const Stack = createStackNavigator();

export default function AppNavigator() {
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
          options={{ title: "Families" }}
        />
        {/* Family screen displays buttons to take surveys */}
        <Stack.Screen
          name="Family"
          component={FamilyScreen}
          options={({ route }) => ({
            title: `${route.params.familyName} Family`,
          })}
        />
        {/* Lists out all family members */}
        <Stack.Screen
          name="FamilyMembers"
          component={FamilyMembers}
          options={({ route }) => ({
            title: `${route.params.familyName} Family Members`,
          })}
        />
        {/* Displays the survey being taken */}
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={({ route }) => ({ title: `${route.params.type} Survey` })}
        />
        {/* Displays survey results */}
        <Stack.Screen
          name="SurveyCompleted"
          component={SurveyCompletedScreen}
          options={{ title: `Results` }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
