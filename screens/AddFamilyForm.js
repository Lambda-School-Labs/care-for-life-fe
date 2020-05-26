import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/Global";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButton from "../components/Button";

const reviewSchema = yup.object({
  name: yup.string().required().min(3),
});

export default function ReviewForm({ addFamily }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addFamily(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Family Name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              onBlur={props.handleBlur("name")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>

            <CustomButton title="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
