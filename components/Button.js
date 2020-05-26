import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingEnd: 10,
    backgroundColor: "maroon",
  },
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
