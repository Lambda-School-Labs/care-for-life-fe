import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Login from "../screens/Login";
import Home from "../screens/Home";
import FamilyForm from "../forms/FamilyForm";
import Families from "../screens/Families";
import Register from "../forms/RegisterForm";
import Register2 from "../forms/Register2";
import Chosen from "../screens/Chosen";
import FamilyMembers from "../screens/FamilyMembers";
import Survey from "../screens/survey";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
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
          name="Register"
          component={Register}
          options={{ title: "Registration" }}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{ title: "Registration" }}
        />
        <Stack.Screen
          name="Families"
          component={Families}
          options={({ navigation }) => ({
            title: "Families Screen",
            headerRight: () => (
              <View style={{ marginRight: 25 }}>
                <MaterialIcons
                  name="add"
                  size={25}
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
        <Stack.Screen
          name="Chosen Families"
          component={Chosen}
          options={{ title: "Chosen Families" }}
        />
        <Stack.Screen
          name="Family Members"
          component={FamilyMembers}
          options={{ title: "Family Members" }}
        />
        <Stack.Screen
          name="Survey"
          component={Survey}
          options={{ title: "Survey" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
