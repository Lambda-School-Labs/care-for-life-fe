import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey } from "../actions/surveyActions";
import CustomTextInput from "../components/TextInput";
import DismissKeyboard from "../components/DismissKeyboard";

const mapStateToProps = (state) => {
  return {
    survey_questions: state.surveyReducer.survey_questions,
  };
};

function Survey({ fetchSurvey, survey_questions }) {
  useEffect(() => {
    console.log("on survey page");
    console.log("survey questions are here", survey_questions);
    fetchSurvey();
  }, []);

  return (
    <ScrollView>
      <DismissKeyboard>
        <View style={styles.screen}>
          {survey_questions.map((i) => {
            return <CustomTextInput title={i.question} />;
          })}
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
}

export default connect(mapStateToProps, { fetchSurvey })(Survey);
