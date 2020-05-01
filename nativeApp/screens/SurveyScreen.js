import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { SimpleSurvey } from "react-native-simple-survey";
import { Bar } from "react-native-progress";

export default class SurveyScreen extends Component {
  constructor(props) {
    //Initialize Filtered Questions Variable
    super(props);
    this.state = {
      answersSoFar: "",
      count: 0,
      progress: 0,
      survey: this.props.route.params.survey,
      start: true,
    };
  }
  //Filters "Info" questions out of survey
  //Allows for accurate Survey progress count
  filterSurvey = async (survey) => {
    //loops through survey and assigns questions that are not marked as "Info" type
    let filteredSurvey = [];
    await survey.forEach((question) => {
      if (question.questionType !== "Info") {
        // console.log('Object:', question.questionType)
        filteredSurvey = [...filteredSurvey, question];
      }
    });
    //sets filtered survey to component state
    this.setState({
      ...this.state,
      survey: filteredSurvey,
    });
  };
  componentDidMount = async () => {
    //runs filterSurvey function on component mount
    await this.filterSurvey(this.state.survey);
  };
  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];
    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    // Here we can manipulate the survey results to send them as an array (infoQuestionsRemoved) or an object (answersAsObj)

    // Send to SurveyCompletedScreen with the survey answers, name (of family or person), the survey type and the survey
    this.props.navigation.navigate("SurveyCompleted", {
      surveyAnswers: infoQuestionsRemoved,
      familyName: this.props.route.params.familyName,
      survey: this.state.survey,
      personName: this.props.route.params.personName,
      surveyName: this.props.route.params.surveyName,
    });
  }

  //Function That decrements the question count and progress state.
  async onPreviousButtonPress(onPress) {
    //performs onPress function from package
    await onPress();
    //then updates the progress
    if (this.state.count > 0) {
      this.setState({
        ...this.state,
        count: (this.state.count -= 1),
        progress: this.state.count / this.state.survey.length,
      });
    }
  }
  //Function That increments the question count and progress state.
  onNextButtonPress(answer) {
    console.log(this.state.start);
    if (this.state.start === true) {
      console.log("toggling start", this.state.start);
      this.setState({ ...this.state, start: false });
      console.log("toggling now:", this.state.start);
    }
    !answer.answered
      ? console.log("This Question Has Been Answered")
      : this.setState({
          ...this.state,
          count: (this.state.count += 1),
          progress: this.state.count / this.state.survey.length,
        });

    console.log("Next Button Pressed! New Count:", this.state.count);
    console.log("Survey Length", this.state.survey.length);
  }
  //  After each answer is submitted this function is called. Here you can take additional steps in response to the
  //  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
  //  is restricted (age, geo-fencing) from your app.
  onAnswerSubmitted(answer) {
    answer = { ...answer, answered: true };
    // console.log("Answer Submitted", answer);
    this.onNextButtonPress(answer);
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
    switch (answer.questionId) {
      default:
        break;
    }
    Keyboard.dismiss();
    // console.log("Size of Survey", this.props.route.params.survey.length);
  }
  //Function That Renders The Previous Button and wrapps the button with an onPress handler
  //Button onPress handler sends you back 1 question
  renderPreviousButton(onPress, enabled) {
    return (
      // <View style={{ flexGrow: 1, width: "45%" }}>
      //   <TouchableOpacity style={styles.button} onPress={() => this.onPreviousButtonPress()}>
      //     <Button
      //       color="#9F1B37"
      //       onPress={onPress}
      //       disabled={!enabled}
      //       title={"Previous"}
      //       style={styles.button}
      //     />
      //   </TouchableOpacity>
      // </View>

      <TouchableOpacity
        onPress={() => this.onPreviousButtonPress(onPress)}
        title={"Previous"}
        color="#9F1B37"
        style={styles.previousButton}
        disabled={!enabled}
      >
        <Text style={styles.buttonText}>
          <FontAwesome5 name="arrow-left" size={30} color="white" />
          Previous
        </Text>
      </TouchableOpacity>
    );
  }
  //Function That Renders The Next Button
  //Button onPress handler sends you back 1 question
  renderNextButton(onPress, enabled) {
    return (
      // <View style={{ flexGrow: 1, width: "45%" }}>
      //   <Button
      //     onPress={onPress}
      //     disabled={!enabled}
      //     title={"Next"}
      //     color="deepskyblue"
      //     style={styles.button}
      //   />
      // </View>
      <TouchableOpacity
        onPress={onPress}
        title={"Next"}
        color="deepskyblue"
        style={styles.nextButton}
        disabled={!enabled}
      >
        <Text style={styles.buttonText}>
          Next
          <FontAwesome5 name="arrow-right" size={30} color="white" />
        </Text>
      </TouchableOpacity>
    );
  }
  //Function That Renders The Finished Button
  //Button onPress handler sends you back to surveys screen
  renderFinishedButton(onPress, enabled) {
    return (
      // <View
      //   style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      // >
      //   <Button
      //     title={"Finished"}
      //     onPress={onPress}
      //     disabled={!enabled}
      //     color="black"
      //   />
      // </View>
      <TouchableOpacity
        onPress={onPress}
        title={"Finish"}
        style={styles.button}
        disabled={!enabled}
      >
        <Text style={styles.buttonText}>
          Finish
          <FontAwesome5 name="flag-checkered" size={30} color="white" />
        </Text>
      </TouchableOpacity>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={styles.answerButtonContainer}
      >
        {console.log("button index:", { data, index })}
        <TouchableOpacity
          onPress={onPress}
          style={isSelected ? styles.answerButtonSelected : styles.answerButton}
          key={`button_${index}`}
        >
          <Text style={styles.answerButtonText}>{data.optionText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={styles.questionWrapper}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    placeholder = `Answer Question Here...`;
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
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
    placeholder = `Answer Question Here...`;
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={(text) => {
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
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.background}>
          <View style={styles.barContiner}>
            <Text style={styles.barContinerText}>
              Progress: {Math.round(this.state.progress * 100)} %
            </Text>
            <Bar
              progress={this.state.progress}
              width={600}
              height={20}
              color={"#9F1B37"}
              borderWidth={3}
              borderColor={"black"}
            />
          </View>
          <SimpleSurvey
            ref={(s) => {
              this.surveyRef = s;
            }}
            survey={this.props.route.params.survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={styles.navButtonContainerStyles}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
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
  barContinerText: {
    fontSize: 25,
    padding: 5,
    fontWeight: "bold",
  },
  answerButtonContainer: {
    width: "100%",
  },
  answerButton: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#333",
  },
  answerButtonSelected: {
    width: "100%",
    height: 200,
    backgroundColor: "forestgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  answerButtonText: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  disabledButton: {
    height: "15%",
    width: "45%",
    backgroundColor: "#333",
    textAlign: "center",
    flexGrow: 1,
    flex: 1,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  button: {
    height: 150,
    width: "45%",
    backgroundColor: "#EE7822",
    textAlign: "center",
    flexGrow: 1,
    flex: 1,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  nextButton: {
    height: 150,
    width: "45%",
    backgroundColor: "#333",
    textAlign: "center",
    flexGrow: 1,
    flex: 1,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  previousButton: {
    height: 150,
    width: "45%",
    backgroundColor: "#333",
    textAlign: "center",
    flexGrow: 1,
    flex: 1,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "space-around",
  },
  barContinerText: {
    fontSize: 25,
    padding: 5,
  },
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    width: 400,
    minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    borderRadius: 10,
    margin: "5%",
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
    borderRadius: 10,
  },
  surveyContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingRight: "5%",
    paddingLeft: "5%",
    flex: 1,
  },
  selectionGroupContainer: {
    flexDirection: "column",
    alignContent: "flex-end",
  },
  background: {
    flex: 1,
    // minHeight: 800,
    // maxHeight: 800,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  questionWrapper: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#9F1B37",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
  },
  textBox: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 5,
    width: "auto",
    padding: 5,
    textAlignVertical: "center",
    color: "black",
    fontSize: 35,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 5,
    width: "auto",
    padding: 5,
    textAlignVertical: "center",
    color: "black",
    fontSize: 35,
  },
  infoTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    color: "white",
    height: "80%",
  },
  infoText: {
    marginBottom: 20,
    fontSize: 40,
    marginLeft: 10,
    width: "75%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#9F1B37",
    padding: 20,
    textTransform: "capitalize",
  },
  navButtonContainerStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "flex-end",
    height: "10%",
  },
});
