import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { postFamily } from "../actions/familyFormAction";
import styles from "../styles";
import CustomButton from "../components/Button";
import CustomTextInput from "../components/TextInput";
import DismissKeyboard from "../components/DismissKeyboard";

const mapStateToProps = (state) => {
  return {
    isLoading: state.familyFormReducer.isLoading,
    error: state.familyFormReducer.error,
  };
};

const FamilyForm = ({ postFamily, navigation }) => {
  const [family, setFamily] = useState({
    family_name: "",
    zone_id: null,
    community_id: null,
  });

  const onSubmit = (values) => {
    postFamily(values);
    navigation.navigate("Families");
  };

  const handleChangeName = (e) => {
    setFamily({
      ...family,
      family_name: e,
    });
  };

  const handleChangeZone = (e) => {
    setFamily({
      ...family,
      zone_id: e,
    });
  };

  const handleChangeCommunity = (e) => {
    setFamily({
      ...family,
      community_id: e,
    });
  };

  return (
    <DismissKeyboard>
      <View style={styles.screen}>
        <CustomTextInput
          title="Family Name"
          onChangeText={handleChangeName}
          name="family_name"
          label="Family Name"
          placeholder="Family Name"
        />
        <CustomTextInput
          title="Zone ID"
          onChangeText={handleChangeZone}
          name="zone_id"
          label="Zone ID"
          placeholder="Zone ID"
        />
        <CustomTextInput
          title="Community ID"
          onChangeText={handleChangeCommunity}
          name="community_id"
          label="Community ID"
          placeholder="Community ID"
        />
        <CustomButton title="submit" onPress={() => onSubmit(family)} />
      </View>
    </DismissKeyboard>
  );
};

export default connect(mapStateToProps, { postFamily })(FamilyForm);
