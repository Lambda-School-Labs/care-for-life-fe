import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "../styles";
import CustomButton from "../components/Button";

const Fields = ({ label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.textInput} />
    </View>
  );
};

const onSubmit = (values) => {
  alert(values);
};

const FamilyForm = (props) => {
  return (
    <View style={styles.screen}>
      <Field name="familyName" component={Fields} label="Family Name" />
      <CustomButton title="submit" onPress={onSubmit} />
    </View>
  );
};

export default reduxForm({
  form: "family",
})(FamilyForm);
