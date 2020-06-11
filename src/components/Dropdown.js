import React, { useState } from "react";
import { View, Picker } from "react-native";
import pickerStyles from "../styles/Picker";
export default function CustomPicker(label, data, cb) {
  // const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={pickerStyles.container}>
      <Picker
        selectedValue={selectedValue}
        style={pickerStyles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          cb(itemValue);
        }}
      >
        <Picker.Item label="please select one" value={null} />
        {data.map((e, i) => {
          return <Picker.Item key={i} label={label} value={e} />;
        })}
      </Picker>
    </View>
  );
}
