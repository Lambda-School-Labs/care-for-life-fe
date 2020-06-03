import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/familyActions';
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    families: state.familyReducer.families
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

function DetailsScreen(props, { navigation }) {

  const getFamilies = () => {
    axios
      .get('https://care-for-life.herokuapp.com/api/families')
      .then(res => {
        console.log("family res", res.data);
        setFamiles(res.data)
      })
      .catch(err => {
        console.log("error", err)
      })
  }


  return (
    <View style={styles.screen}>
      {families.map(i => {
        return (
          <Text>{i.family_name}</Text>
        )
      })}
      <Text>Details Screen</Text>
      <Button
        title="Get Families"
        onPress={() => getFamilies()}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)