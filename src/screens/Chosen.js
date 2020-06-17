import React, { useEffect } from "react";
import { View, Text, AsyncStorage, ScrollView } from "react-native";
import axios from "axios";
import styles from "../styles";
import { connect } from "react-redux";
import { setChosenFamilies } from "../actions/familyActions";
import { setCurrentFam, resetResponses, resetStagedResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = (state) => {
  return {
    chosenFamilies: state.familyReducer.chosenFamilies,
    stagedResponses: state.surveyReducer.stagedResponses
  };
};

function Chosen({ navigation, chosenFamilies, setCurrentFam, stagedResponses, resetResponses, resetStagedResponses }) {

  useEffect(() => {
    /// resets the response array to an empty array
    resetResponses();
  }, [])

  const submitAllResponses = async () => {
    /// mapping over staged responses and posting them to the backend
    await stagedResponses.map(i => {
      axios
        .post(`https://care-for-life.herokuapp.com/api/responses`, i)
        .then(res => {
          console.log("response submitted")
        })
        .catch(err => {
          console.log(err)
        })
    })
    // NetInfo.fetch()
    //   .then(res => {
    //     console.log('is connected?', res.isConnected)
    //   })
  }

  const reset = () => {
    /// clears the staged responses array
    resetStagedResponses()
    console.log("Staged Responses:", stagedResponses)
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View>
          <Text>Chosen Families:</Text>
          {chosenFamilies.map(i => {
            return (
              <CustomButton key={i.id} title={i.family_name} onPress={() => {
                navigation.navigate('Family Members', { members: i.members, name: i.family_name });
                setCurrentFam(i)
              }} />
            )
          })}
        </View>
        <CustomButton title={"Submit All"} onPress={submitAllResponses} />
        <CustomButton title={"Reset Staged Responses"} onPress={reset} />
      </View>
    </ScrollView>
  );
}

export default connect(mapStateToProps, { resetResponses, setChosenFamilies, setCurrentFam, resetStagedResponses })(Chosen);
