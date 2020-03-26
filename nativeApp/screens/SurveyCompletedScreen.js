import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';

export default class SurveyCompletedScreen extends Component {

  render() {
    const answers = this.props.route.params.surveyAnswers;
    const familyName = this.props.route.params.familyName;
    const personName = this.props.route.params.personName;
    const type = this.props.route.params.type;

    let button;
    let text;

    if (type === 'Family') {
      button = <Button
      title="Go Home"
      onPress={() => this.props.navigation.navigate('Family', { survey: answers, familyName: familyName })}
      />
      text = <Text>{familyName} Family</Text>
    } else if (type === 'Person') {
      button = <Button
      title="Go Home"
      onPress={() => this.props.navigation.navigate('FamilyMembers', { survey: answers, familyName: familyName, personName: personName })}
      />
      text = <Text>{personName}</Text>
    }
    
    return (
      <View style={styles.background}>
        {text}
        <View style={styles.container}>
          <ScrollView>
            {answers.map(el => (
              // Here, I just used JavaScript to display the questionId and answer value
              <Text key={Math.random()}>{el.questionId.replace(/_/g, ' ')}: {el.value.value ? el.value.value : el.value}</Text>
            ))}
          </ScrollView>
          {button}
        </View>
      </View>
    );
  }
}

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
        fontSize: 20
    },
});