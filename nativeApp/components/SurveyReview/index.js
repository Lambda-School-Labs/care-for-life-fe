import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SurveyReview = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
      <ScrollView style={styles.scrollContainer}>
        {props.answers.map((el, index) => (
          <TouchableOpacity
            onPress={() => props.handleEdit(index)}
            style={styles.answerContainer}
            key={el.questionId}
          >
            <Text style={styles.question}>
              {index + 1}: {props.fullSurvey[index].questionText}
            </Text>
            <Text style={styles.answer}>
              {el.value.value ? el.value.value : el.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={props.submitHandler}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 20,
    height: "95%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    fontSize: 30,
    width: "100%",
    backgroundColor: "black",
    color: "white",
  },
  scrollContainer: {
    width: "95%",
  },
  answerContainer: {
    width: "100%",
    marginVertical: 5,
    padding: 5,
    // borderBottomColor: "black",
    // borderBottomWidth: 2,
  },
  question: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  answer: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "left",
    color: "green",
  },
  button: {
    width: "95%",
    backgroundColor: "black",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default SurveyReview;
