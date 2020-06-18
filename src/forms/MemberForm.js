import React, { useState } from "react";
import { View, ScrollView, Picker } from "react-native";
import { connect } from "react-redux";
import { postFamilyMember } from "../actions/MemberAction";
import styles from "../styles";
import CustomButton from "../components/Button";
import CustomTextInput from "../components/TextInput";
import DismissKeyboard from "../components/DismissKeyboard";

const mapStateToProps = (state) => {
  return {
    isLoading: state.familyFormReducer.isLoading,
    error: state.familyFormReducer.error,
    currentFamily: state.surveyReducer.currentFamily,
  };
};

const MemberForm = ({ postFamilyMember, navigation, currentFamily }) => {
  const [familyMember, setFamilyMember] = useState({
    first_name: "",
    last_name: "",
    family_id: currentFamily.id,
    date_of_birth: "",
    gender: "",
    hoh: null,
    relation_to_hoh: "",
    marital_status: "",
  });

  // const [selectedValue, setSelectedValue] = useState(false);

  const onSubmit = (values) => {
    postFamilyMember(values);
    navigation.navigate("Family Members");
  };

  const handleChangeFirstName = (e) => {
    setFamilyMember({
      ...familyMember,
      first_name: e,
    });
  };

  const handleChangeLastName = (e) => {
    setFamilyMember({
      ...familyMember,
      last_name: e,
    });
  };

  const handleChangeDateOfBirth = (e) => {
    setFamilyMember({
      ...familyMember,
      date_of_birth: e,
    });
  };

  const handleChangeGender = (e) => {
    setFamilyMember({
      ...familyMember,
      gender: e,
    });
  };

  const handleChangeHeadOfHouseHold = (e) => {
    if (e === "Yes" || e === "yes" || e === "Y" || e === "y") {
      e = true;
    } else if (e === "No" || e === "no" || e === "N" || e === "n") {
      e = false;
    }

    setFamilyMember({
      ...familyMember,
      hoh: e,
    });
  };

  const handleChangeRelationToHOH = (e) => {
    setFamilyMember({
      ...familyMember,
      relation_to_hoh: e,
    });
  };

  const handleChangeMaritalStatus = (e) => {
    setFamilyMember({
      ...familyMember,
      marital_status: e,
    });
  };

  return (
    <DismissKeyboard>
      <ScrollView>
        <View style={styles.screen}>
          <CustomTextInput
            title="First Name"
            onChangeText={handleChangeFirstName}
            name="first_name"
            label="First Name"
            placeholder="First Name"
          />
          <CustomTextInput
            title="Last Name"
            onChangeText={handleChangeLastName}
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
          />
          <CustomTextInput
            title="Date Of Birth"
            onChangeText={handleChangeDateOfBirth}
            name="date_of_birth"
            label="Date Of Birth"
            placeholder="Date Of Birth"
          />
          <CustomTextInput
            title="Gender"
            onChangeText={handleChangeGender}
            name="gender"
            label="Gender"
            placeholder="Gender"
          />
          <CustomTextInput
            title="Head Of House Hold (Yes or No)"
            onChangeText={handleChangeHeadOfHouseHold}
            name="head_of_house_hold"
            label="Head Of House Hold"
            placeholder="Head Of House Hold"
          />
          <CustomTextInput
            title="Relation To Head Of House Hold"
            onChangeText={handleChangeRelationToHOH}
            name="relation_to_head_of_house_hold"
            label="Relation To Head Of House Hold"
            placeholder="Relation To HOH"
          />
          <CustomTextInput
            title="Marital Status"
            onChangeText={handleChangeMaritalStatus}
            name="marital_status"
            label="Marital Status"
            placeholder="Marital Status"
          />
          <CustomButton title="submit" onPress={() => onSubmit(familyMember)} />
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default connect(mapStateToProps, { postFamilyMember })(MemberForm);
