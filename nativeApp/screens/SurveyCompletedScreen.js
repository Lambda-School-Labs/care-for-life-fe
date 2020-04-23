import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { useOfflineMutation } from 'react-offix-hooks';
import { addFamilyAndAnswersMutation } from '../Queries/queries';

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

  const handleSubmit = async (props) => {
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

  let button;
  let text;

  if (type === 'Family') {
    button = <Button title="Go Home" onPress={() => handleSubmit(props)} />;
    text = <Text>{familyName} Family</Text>;
  } else if (type === 'Person') {
    button = (
      <Button
        title="Go Home"
        onPress={() =>
          props.navigation.navigate('FamilyMembers', {
            survey: answers,
            familyName: familyName,
            personName: personName,
          })
        }
      />
    );
    text = <Text>{personName}</Text>;
  }
  return (
    <View style={styles.background}>
      {text}
      <View style={styles.container}>
        <ScrollView>
          {answers.map((el) => (
            // Here, I just used JavaScript to display the questionId and answer value
            <Text key={Math.random()}>
              {el.questionId.replace(/_/g, ' ')}:{' '}
              {el.value.value ? el.value.value : el.value}
            </Text>
          ))}
        </ScrollView>

        {button}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
});

export default SurveyCompletedScreen;
