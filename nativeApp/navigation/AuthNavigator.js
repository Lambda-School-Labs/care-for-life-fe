import React from "react";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Log In",
            animationTypeForReplace: "push",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Register",
            animationTypeForReplace: "push",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
