import React from "react";
import { View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import FamilyForm from "../forms/FamilyForm";
import Families from "../screens/Families";

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
          name="Families"
          component={Families}
          options={({ navigation, route }) => ({
            title: "Families Screen",
            headerRight: () => (
              <View style={{ margin: 5 }}>
                <Button
                  title="Add Family"
                  onPress={() => navigation.navigate("FamilyForm")}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="FamilyForm"
          component={FamilyForm}
          options={{ title: "Add Family" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
