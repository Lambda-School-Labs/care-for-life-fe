import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/familyActions';
import axios from "axios";

function DetailsScreen({ navigation }) {

  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Family Form"
        onPress={() => navigation.push("FamilyForm")}
      />

      {/* <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
      {/* <Button
        title="Go to Details...again"
        onPress={() => navigation.push("Details")}
      /> */}
    </View>
  );
}

export default connect(null, null)(DetailsScreen)