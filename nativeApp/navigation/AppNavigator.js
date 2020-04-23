import React from "react";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SurveyScreen from "../screens/SurveyScreen";
import SurveyCompletedScreen from "../screens/SurveyCompletedScreen";
import Header from "../components/Header/index";
import AllFamiliesScreen from "../screens/AllFamiliesScreen";
import FamilyScreen from "../screens/FamilyScreen";
import FamilyMembers from "../screens/FamilyMembersScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Families"
          component={AllFamiliesScreen}
          options={{ title: "Families" }}
        />
        <Stack.Screen
          name="Family"
          component={FamilyScreen}
          options={({ route }) => ({
            title: `${route.params.familyName} Family`,
          })}
        />
        <Stack.Screen
          name="FamilyMembers"
          component={FamilyMembers}
          options={({ route }) => ({
            title: `${route.params.familyName} Family Members`,
          })}
        />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={({ route }) => ({ title: `${route.params.type} Survey` })}
        />
        <Stack.Screen
          name="SurveyCompleted"
          component={SurveyCompletedScreen}
          options={{ title: `Results` }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
