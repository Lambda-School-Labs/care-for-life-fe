import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { postFamily } from "../actions/familyFormAction";
import styles from "../styles";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
  return {
    isLoading: state.familyFormReducer.isLoading,
    error: state.familyFormReducer.error,
  };
};

const FamilyForm = ({ postFamily }) => {
  const [family, setFamily] = useState({
    family_name: "",
    zone_id: null,
    community_id: null,
  });

  const onSubmit = (values) => {
    console.log(values);
    postFamily(values);
  };

  const handleChangeName = (e) => {
    console.log(e);

    setFamily({
      ...family,
      family_name: e,
    });
  };

  const handleChangeZone = (e) => {
    console.log(e);

    setFamily({
      ...family,
      zone_id: e,
    });
  };

  const handleChangeCommunity = (e) => {
    console.log(e);

    setFamily({
      ...family,
      community_id: e,
    });
  };

  return (
    <View style={styles.screen}>
      <Text>Family Name</Text>
      <TextInput
        onChangeText={handleChangeName}
        name="family_name"
        style={styles.textInput}
        label="Family Name"
      />
      <Text>Zone ID</Text>
      <TextInput
        onChangeText={handleChangeZone}
        name="zone_id"
        style={styles.textInput}
        label="Zone ID"
      />
      <Text>Community ID</Text>
      <TextInput
        onChangeText={handleChangeCommunity}
        name="community_id"
        style={styles.textInput}
        label="Community ID"
      />
      <CustomButton title="submit" onPress={() => onSubmit(family)} />
    </View>
  );
};

export default connect(mapStateToProps, { postFamily })(FamilyForm);
