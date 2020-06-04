import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/familyActions';
import axios from "axios";

function DetailsScreen(props, { navigation }) {

  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details...again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default connect(null, null)(DetailsScreen)