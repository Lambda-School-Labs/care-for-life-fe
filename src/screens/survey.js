import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import {
  fetchSurvey,
  addResponse,
  stageResponses,
  createCompletedSurvey,
  resetResponses,
} from "../actions/surveyActions";
import CustomButton from "../components/Button";
import CustomTextInput from "../components/TextInput";

const mapStateToProps = (state) => {
  return {
    survey_questions: state.surveyReducer.survey_questions,
    user_id: state.userReducer.user_id,
    currentFamily: state.surveyReducer.currentFamily,
    currentCompSurvey: state.surveyReducer.currentCompSurvey,
    currentIndividual: state.surveyReducer.currentIndividual,
  };
};

function Survey({
  navigation,
  fetchSurvey,
  survey_questions,
  stageResponses,
  createCompletedSurvey,
  user_id,
  currentFamily,
  currentCompSurvey,
  currentIndividual,
}) {
  /// local state for responses
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    /// temporary array for responses
    let resp = [];

    /// creating a completed survey to post the responses to
    createCompletedSurvey({
      survey_id: 1,
      supervisor_id: user_id,
      family_id: currentFamily.id,
    })
      .then((res) => {
        ///getting survey questions and info
        fetchSurvey()
          .then(async (res) => {
            console.log("in the .then");
            survey_questions &&
              survey_questions.map(async (i) => {
                // console.log("survey_question", i)
                console.log("adding response");
                // console.log(resp)
                /// pushing a response to the temporary response array
                return resp.push({
                  question_id: i.id,
                  response: "",
                  completed_survey_id: currentCompSurvey.id,
                  family_id: currentFamily.id,
                  individual_id: currentIndividual
                    ? currentIndividual.id
                    : null,
                });
              });
          })
          .then((res) => {
            /// setting temporary response array to local response state
            setResponses(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submit = async (e) => {
    /// pushes all the local responses to the staged response array
    stageResponses(responses);
    navigation.navigate("Chosen Families");
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View>
          {survey_questions
            ? survey_questions.map((i, index) => {
                return (
                  <View>
                    <CustomTextInput
                      key={i.id}
                      title={i.question}
                      style={styles.textInput}
                      onChangeText={(e) => {
                        /// change handler for responses
                        setResponses([
                          ...responses,
                          (responses[index].response = e),
                        ]);
                      }}
                    />
                  </View>
                );
              })
            : null}
          <CustomButton
            onPress={() => {
              submit();
            }}
            title={"Submit"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default connect(mapStateToProps, {
  fetchSurvey,
  addResponse,
  stageResponses,
  createCompletedSurvey,
  resetResponses,
})(Survey);
