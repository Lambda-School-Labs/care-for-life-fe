import React from "react";
import { StyleSheet, View } from "react-native";
import { useOfflineMutation } from "react-offix-hooks";
import { addFamilyMutation } from "../Queries/queries";
import SurveyReview from "../components/SurveyReview";

const SurveyCompletedScreen = (props) => {
  const [addFamily, state] = useOfflineMutation(addFamilyMutation);

  const answers = props.route.params.surveyAnswers;
  const fullSurvey = props.route.params.fullSurvey;
  const familyName = props.route.params.familyName;
  const personName = props.route.params.personName;
  const type = props.route.params.type;

  const annualSurveyHandler = async () => {
    console.log("Submitting Answers....", fullSurvey);

    await answers.forEach((answer, index) => {
      console.log("answer being mutated", answer.value);
      console.log("answers backendID", fullSurvey[index].backend_id);
      try {
        addAnswers({
          variables: {
            answer: answer.value.value
              ? answer.value.value.toString()
              : answer.value.toString(),
            questionId: fullSurvey[index].backend_id,
            familyId: "ck9a3uqh384530874p5ws4zo8",
            surveyId: "ck98pnlc17hmd0874rfdsxug0",
          },
        });
      } catch (error) {
        if (error.offline) {
          error
            .watchOfflineChange()
            .then((res) => console.log("Offline result", res));
        }
        console.log(error);
      }
    });

    props.navigation.navigate("Family", {
      survey: answers,
      familyName: familyName,
    });
  };

  return (
    <View style={styles.background}>
      <SurveyReview
        name={familyName}
        submitHandler={annualSurveyHandler}
        answers={answers}
        fullSurvey={fullSurvey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
});

export default SurveyCompletedScreen;
