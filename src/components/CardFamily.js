import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import cardStyles from "../styles/Card";

export default function CustomCardFamily({ title, onPress }) {
  return (
    <View style={cardStyles.cardContainer}>
      <TouchableOpacity onPress={onPress} style={cardStyles.card}>
        <Image
          style={cardStyles.cardImage}
          source={require("../images/family.png")}
        />
        <Text style={cardStyles.cardText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
