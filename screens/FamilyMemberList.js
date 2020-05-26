import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/Global";
import CustomButton from "../components/Button";

export default function FamilyMemberList({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>
        Family Member Screen for {navigation.getParam("name")}
      </Text>
      <CustomButton title="Previous Screen" onPress={pressHandler} />
    </View>
  );
}
