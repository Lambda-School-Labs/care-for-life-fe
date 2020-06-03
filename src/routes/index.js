import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import HomeScreen from "../screens/Home";
import DetailsScreen from "../screens/Details";
import FamiliesScreen from "../screens/Families";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login Screen" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details Screen" }}
        />
        <Stack.Screen
          name="Families"
          component={FamiliesScreen}
          options={{ title: "Families Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
