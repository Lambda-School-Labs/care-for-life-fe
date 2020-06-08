import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
