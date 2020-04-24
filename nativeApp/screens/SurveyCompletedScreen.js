import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useOfflineMutation } from "react-offix-hooks";
import {
  addFamilyAndAnswersMutation,
  addIndividualAndAnswersMutation,
} from "../Queries/queries";
import SurveyReview from "../components/SurveyReview";
import Modal from "react-native-modal";

const SurveyCompletedScreen = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [answerIndex, setAnswerIndex] = useState("");

  useEffect(() => {
    Alert.alert("Press on any answer that needs editing");
  }, []);

  const [addFamilyAndAnswers, state] = useOfflineMutation(
    addFamilyAndAnswersMutation
  );

  const [addFamilyIndividualAndAnswers] = useOfflineMutation(
    addIndividualAndAnswersMutation
  );

  // need to store the backend ID returned during login/registration and set it to equal the userId variable on the line below
  const userId = "Insert ID of the logged in user";
  let answers = props.route.params.surveyAnswers;
  const fullSurvey = props.route.params.fullSurvey;
  const familyName = props.route.params.familyName;
  const personName = props.route.params.personName;
  const type = props.route.params.type;

  const annualSurveyHandler = async () => {
    console.log("Submitting Answers....", answers);

    await answers.forEach((answer, index) => {
      console.log("answer being mutated", answer.value);
      console.log("answers backendID", fullSurvey[index].backend_id);
      try {
        addFamilyAndAnswers({
          variables: {
            familyName: familyName,
            surveyName: "Family Annual Survey",
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Passed to SurveyReview component
  // Used in an onPress for every survey question
  // Sets selected survey question info to state (question, answer and index)
  // Activates edit modal
  const handleEdit = (index) => {
    setAnswer(
      answers[index].value.value
        ? answers[index].value.value
        : answers[index].value
    );
    setQuestion(fullSurvey[index].questionText);
    setAnswerIndex(index);
    toggleModal();
  };

  const handleChange = (text) => {
    setAnswer(text);
  };

  // Used in the edit modal to update a survey question answer
  // If modal input is left blank, original answer is kept unchanged
  // If answer is changed in the modal input, the answer will be updated
  // The if check checks to see if the question has a nested value
  // The ternary keeps strings strings and integers integers since the input requires a type of string
  const handleSubmit = () => {
    if (!answer) {
      toggleModal();
      return;
    }
    if (answers[answerIndex].value.value) {
      answers[answerIndex].value.value = !isNaN(answer)
        ? parseInt(answer)
        : answer;
    } else {
      answers[answerIndex].value = !isNaN(answer) ? parseInt(answer) : answer;
    }

    setAnswer("");
    setQuestion("");
    setAnswerIndex("");
    toggleModal();
  };

  const individualSurveyHandler = async () => {
    console.log("Submitting Answers....", fullSurvey);

    await answers.forEach((answer, index) => {
      console.log("answer being mutated", answer.value);
      // console.log('answers backendID', fullSurvey[index].backend_id);
      try {
        addIndividualAndAnswers({
          variables: {
            personName: personName,
            surveyName: "Individual Annual Survey",
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
            .then((res) => console.log("Offline result", res));
        }
        console.log(error);
      }
    });

    props.navigation.navigate("FamilyMembers", {
      survey: answers,
    });
  };

  return (
    <View style={styles.background}>
      <SurveyReview
        name={familyName}
        submitHandler={annualSurveyHandler}
        answers={answers}
        fullSurvey={fullSurvey}
        handleEdit={handleEdit}
      />
      <Modal isVisible={isModalVisible} backdropOpacity={0.9}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{question}</Text>
          <TextInput
            placeholder="answer here"
            value={answer.toString()}
            onChangeText={handleChange}
            name="answer"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button color="red" title="Cancel" onPress={toggleModal} />
            </View>
            <View style={styles.button}>
              <Button title="Update" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    color: "white",
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    width: 100,
  },
});

export default SurveyCompletedScreen;
