import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/Global";
import CustomButton from "../components/Button";

export default function Login({ navigation }) {
  const pressHandler = () => {
    //navigation.goBack();
    navigation.navigate("FamilyList");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Login Screen</Text>
      <CustomButton title="Family List" onPress={pressHandler} />
    </View>
  );
}
