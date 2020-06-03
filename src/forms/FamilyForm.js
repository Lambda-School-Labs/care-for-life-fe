import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "../styles";

const Fields = ({ label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.textInput} />
    </View>
  );
};

const onSubmit = (values) => {
  alert("PlaceHolder");
};

const FamilyForm = (props) => {
  return (
    <View style={styles.screen}>
      <Field name="firstName" component={Fields} label="First Name" />
      <Field name="lastName" component={Fields} label="Last Name" />
      <Button title="submit" onPress={onSubmit} />
    </View>
  );
};

export default reduxForm({
  form: "family",
})(FamilyForm);
