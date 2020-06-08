import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { getFamilies } from "../actions/familyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
  // console.log("family state", state.familyReducer.families)
  return {
    families: state.familyReducer.families,
    isLoading: state.familyReducer.isLoading,
    error: state.familyReducer.error,
  };
};

function Families({ navigation, getFamilies, isLoading, error, families }) {
  useEffect(() => {
    getFamilies();
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {families.map((i) => {
          return <CustomButton key={i.id} title={i.family_name} />;
        })}
      </View>
    </ScrollView>
  );
}

export default connect(mapStateToProps, { getFamilies })(Families);
