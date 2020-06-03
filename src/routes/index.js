import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Details from "../screens/Details";
import FamilyForm from "../forms/FamilyForm";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login Screen" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Details Screen" }}
        />
        <Stack.Screen
          name="FamilyForm"
          component={FamilyForm}
          options={{ title: "Family Form Survey" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
