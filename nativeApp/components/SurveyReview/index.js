import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SurveyReview = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
      <ScrollView style={styles.scrollContainer}>
        {props.answers.map((el, index) => (
          <View style={styles.answerContainer} key={el.questionId}>
            <View>
              <Text style={styles.question}>
                {index + 1}: {props.survey[index].questionText}
              </Text>
              <Text style={styles.answer}>
                {el.value.value ? el.value.value : el.value}
              </Text>
            </View>
            <TouchableOpacity onPress={() => props.handleEdit(index)}>
              <FontAwesome5 name="edit" size={30} color="black" />
            </TouchableOpacity>
          </View>
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
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "#9F1B37",
    fontWeight: "bold",
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
