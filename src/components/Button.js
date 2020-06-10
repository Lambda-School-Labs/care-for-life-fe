import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import buttonStyles from "../styles/Button";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyles.button}>
        <Text style={buttonStyles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
