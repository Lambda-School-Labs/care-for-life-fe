import React from "react";
import { View, Text, TextInput } from "react-native";
import textInputStyles from "../styles/TextInput";

export default function CustomTextInput({
  key,
  title,
  onChangeText,
  name,
  label,
  placeholder,
}) {
  return (
    <View key={key}>
      <Text style={textInputStyles.textTitle}>{title}</Text>
      <TextInput
        style={textInputStyles.textInput}
        onChangeText={onChangeText}
        name={name}
        label={label}
        placeholder={placeholder}
      />
    </View>
  );
}
