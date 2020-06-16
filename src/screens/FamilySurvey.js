import React, { useEffect, useSelector } from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey } from "../actions/surveyActions";
import CustomTextInput from "../components/TextInput";
import DismissKeyboard from "../components/DismissKeyboard";

const mapStateToProps = (state) => {
  return {
    survey_questions: state.surveyReducer.survey_questions,
    role: state.userReducer.role_name,
  };
};

function FamilySurvey({ fetchSurvey, survey_questions, role }) {

    // const role = useSelector((state) => console.log(state));
    // role names need updating
    useEffect(() => {
      console.log("on survey page");
      console.log("survey questions are here", survey_questions);
      if (role === 'field_officer'){
        fetchSurvey(1);
      } else if ( role === 'agriculture supervisor'){
        fetchSurvey(2);
      } else if ( role === 'health supervisor'){
        fetchSurvey(4);
      } else if ( role === 'income generation supervisor'){
        fetchSurvey(3);
      }
      fetchSurvey(1);
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

export default connect(mapStateToProps, { fetchSurvey })(FamilySurvey);
