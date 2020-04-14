import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleSurvey } from "react-native-simple-survey";
import Card from "../components/Card";
import { Bar } from "react-native-progress";

export default class SurveyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersSoFar: "",
      count: 0,
      progress: 0,
      survey: this.props.route.params.survey
    };
  }
  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    // Here we can manipulate the survey results to send them as an array (infoQuestionsRemoved) or an object (answersAsObj)

    // Send to SurveyCompletedScreen with the survey answers, name (of family or person), and the survey type
    this.props.navigation.navigate("SurveyCompleted", {
      surveyAnswers: infoQuestionsRemoved,
      familyName: this.props.route.params.familyName,
      personName: this.props.route.params.personName,
      type: this.props.route.params.type
    });
  }

  //Function That decrements the question count and progress state.
  onPreviousButtonPress() {
    if(this.state.count > 0){
      this.setState({
        ...this.state,
        count: (this.state.count -= 1),
        progress: this.state.count / this.state.survey.length
      });
    }
    console.log("Previous Button Pressed! New Count:", this.state.count);
  }
  //Function That increments the question count and progress state.
  onNextButtonPress(answer) {
    !answer.answered
      ? console.log("This Question Has Been Answered")
      : this.setState({
          ...this.state,
          count: (this.state.count += 1),
          progress: this.state.count / this.state.survey.length
        });

    console.log("Next Button Pressed! New Count:", this.state.count);
  }
  //  After each answer is submitted this function is called. Here you can take additional steps in response to the
  //  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
  //  is restricted (age, geo-fencing) from your app.
  onAnswerSubmitted(answer) {
    answer = { ...answer, answered: true };
    console.log("Answer Submitted", answer);
    this.onNextButtonPress(answer);
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2)
    });
    switch (answer.questionId) {
      default:
        break;
    }
    Keyboard.dismiss();
    console.log("Size of Survey", this.props.route.params.survey.length);
  }
  //Function That Renders The Previous Button and wrapps the button with an onPress handler
  //Button onPress handler sends you back 1 question
  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <TouchableOpacity onPress={() => this.onPreviousButtonPress()}>
          <Button
            color="black"
            onPress={onPress}
            disabled={!enabled}
            title={"Previous"}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    );
  }
  //Function That Renders The Next Button
  //Button onPress handler sends you back 1 question
  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color="black"
          onPress={onPress}
          disabled={!enabled}
          title={"Next"}
          style={styles.button}
        />
      </View>
    );
  }
  //Function That Renders The Finished Button
  //Button onPress handler sends you back to surveys screen
  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          title={"Finished"}
          onPress={onPress}
          disabled={!enabled}
          color="black"
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: "flex-start" }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? "black" : "blue"}
          style={isSelected ? { fontWeight: "bold" } : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={"white"}
          placeholder={placeholder}
          placeholderTextColor={"rgba(184,184,184,1)"}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={text => {
          onChange(text);
        }}
        underlineColorAndroid={"white"}
        placeholderTextColor={"rgba(184,184,184,1)"}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={"numeric"}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.background}>
          <Card style={styles.container}>
            <SimpleSurvey
              ref={s => {
                this.surveyRef = s;
              }}
              survey={this.props.route.params.survey}
              renderSelector={this.renderButton.bind(this)}
              containerStyle={styles.surveyContainer}
              selectionGroupContainerStyle={styles.selectionGroupContainer}
              navButtonContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
              renderPrevious={this.renderPreviousButton.bind(this)}
              renderNext={this.renderNextButton.bind(this)}
              renderFinished={this.renderFinishedButton.bind(this)}
              renderQuestionText={this.renderQuestionText}
              onSurveyFinished={answers => this.onSurveyFinished(answers)}
              onAnswerSubmitted={answer => this.onAnswerSubmitted(answer)}
              renderTextInput={this.renderTextBox}
              renderNumericInput={this.renderNumericInput}
              renderInfo={this.renderInfoText}
            />
          </Card>

          <View style={styles.barContiner}>
            <Text style={styles.barContinerText}>Progress: {Math.round(this.state.progress * 100)} %</Text>
            <Bar
              progress={this.state.progress}
              width={400}
              height={20}
              color={"#333"}
              borderWidth={3}
              borderColor={"black"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  barContiner: {
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  barContinerText:{
    fontSize: 25,
    padding: 5
  },
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    width: 400,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    borderRadius: 10,
    margin: "5%",
    backgroundColor: "#333"
    // flex: 1,
  },
  answersContainer: {
    width: "90%",
    maxHeight: "20%",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 10
  },
  // surveyContainer: {
  //     width: 'auto',
  //     alignSelf: 'center',
  //     backgroundColor: 'white',
  //     borderBottomLeftRadius: 5,
  //     borderBottomRightRadius: 5,
  //     borderTopLeftRadius: 5,
  //     borderTopRightRadius: 5,
  //     alignContent: 'center',
  //     padding: 5,
  //     flexGrow: 0,
  // },
  selectionGroupContainer: {
    flexDirection: "column",
    alignContent: "flex-end"
  },
  background: {
    flex: 1,
    // minHeight: 800,
    // maxHeight: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  textBox: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 5,
    width: 250,
    padding: 5,
    textAlignVertical: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color:"black",
    fontSize: 20
  },
  numericInput: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
    color: "white"
  }
});
