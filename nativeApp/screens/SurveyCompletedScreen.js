import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useOfflineMutation } from "react-offix-hooks";
import {
  addFamilyAndAnswersMutation,
  addPersonAndAnswersMutation,
} from "../Queries/queries";
import SurveyReview from "../components/SurveyReview";
import Modal from "react-native-modal";

const SurveyCompletedScreen = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [answerIndex, setAnswerIndex] = useState("");
  const [addFamilyAndAnswers] = useOfflineMutation(addFamilyAndAnswersMutation);
  const [addPersonAndAnswers] = useOfflineMutation(addPersonAndAnswersMutation);

  useEffect(() => {
    Alert.alert("Press on any answer that needs editing");
  }, []);

  // need to store the backend ID returned during login/registration and set it to equal the userId variable on the line below
  const userId = "ck90eb2ce3vt40874lv2moncz"; //Update once login mutation works
  let answers = props.route.params.surveyAnswers;
  const survey = props.route.params.survey;
  const familyName = props.route.params.familyName;
  const personName = props.route.params.personName;
  const surveyName = props.route.params.surveyName;

  const familySurveyHandler = async () => {
    console.log("Submitting Answers....", answers);
    await answers.forEach((answer, index) => {
      try {
        console.log("logging mutation variables...");
        console.log(
          "Variables:",
          answer.value,
          answer.value.value,
          familyName,
          userId,
          survey[index].backend_id
        );
        addFamilyAndAnswers({
          variables: {
            familyName: familyName,
            surveyName: surveyName,
            employeeId: userId,
            answerText: answer.value.value
              ? answer.value.value.toString()
              : answer.value.toString(),
            questionId: survey[index].backend_id,
          },
        }).then((res) => console.log("mutation response:", res));
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

  const personSurveyHandler = async () => {
    console.log("Submitting Answers....", survey);

    await answers.forEach((answer, index) => {
      console.log("answer being mutated", answer.value);
      // console.log('answers backendID', survey[index].backend_id);
      try {
        addPersonAndAnswers({
          variables: {
            personName: personName,
            surveyName: surveyName,
            employeeId: userId,
            answerText: answer.value.value
              ? answer.value.value.toString()
              : answer.value.toString(),
            questionId: survey[index].backend_id,
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

    // props.navigation.navigate("FamilyMembers", {
    //   survey: answers,
    //   familyName: familyName,
    // });
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
    setQuestion(survey[index].questionText);
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

  return (
    <View style={styles.background}>
      {surveyName === "Family Annual Survey" ? (
        <SurveyReview
          name={familyName}
          submitHandler={familySurveyHandler}
          answers={answers}
          survey={survey}
          handleEdit={handleEdit}
        />
      ) : (
        <SurveyReview
          name={personName}
          submitHandler={personSurveyHandler}
          answers={answers}
          survey={survey}
          handleEdit={handleEdit}
        />
      )}
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
