import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useOfflineMutation } from 'react-offix-hooks';
import { addFamilyAndAnswersMutation } from '../Queries/queries';
import SurveyReview from '../components/SurveyReview';

const SurveyCompletedScreen = (props) => {
  const [addFamilyAndAnswers, state] = useOfflineMutation(
    addFamilyAndAnswersMutation
  );

  // need to store the backend ID returned during login/registration and set it to equal the userId variable on the line below
  const userId = 'Insert ID of the logged in user';
  const answers = props.route.params.surveyAnswers;
  const fullSurvey = props.route.params.fullSurvey;
  const familyName = props.route.params.familyName;
  const personName = props.route.params.personName;
  const type = props.route.params.type;

  const annualSurveyHandler = async () => {
    console.log('Submitting Answers....', fullSurvey);

    await answers.forEach((answer, index) => {
      console.log('answer being mutated', answer.value);
      console.log('answers backendID', fullSurvey[index].backend_id);
      try {
        addFamilyAndAnswers({
          variables: {
            familyName: familyName,
            surveyName: 'Family Annual Survey',
            employeeId: userId,
            answerText: answer.value.value
              ? answer.value.value.toString()
              : answer.value.toString(),
            questionId: fullSurvey[index].backend_id,
          },
        });
      } catch (error) {
        if (error.offline) {
          error
            .watchOfflineChange()
            .then((res) => console.log('Offline result', res));
        }
        console.log(error);
      }
    });

    props.navigation.navigate('Family', {
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default SurveyCompletedScreen;
