import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';

const Survey = ({route, navigation}) => {

  console.log(route.params.survey)
  const answers = route.params.survey;
  return (
    <View style={styles.background}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.questionText}>The results are in!</Text>
                        <Text style={styles.questionText}>Your favorite color: {answers.favoriteColor}</Text>
                        <Text style={styles.questionText}>Your favorite number: {answers.favoriteNumber}</Text>
                        <Text style={styles.questionText}>You said you can juggle {answers.jugglingBalls} balls at once{answers.jugglingBalls > 1 ? '!' : '.'}</Text>
                        <Text style={styles.questionText}>Your favorite pet: {answers.favoritePet.value}</Text>
                        <Text style={styles.questionText}>Your favorite foods: {answers.favoriteFoods[0].value} and {answers.favoriteFoods[1].value}</Text>
                        <Text style={styles.questionText}>How you relax: {answers.relax[0].value} and {answers.relax[1].value}</Text>
                        <Text style={styles.questionText}>When confronted with a radio button you picked: {answers.radio.value}</Text>
                        <Text style={styles.questionText}>When given a default you chose: the {answers.singleDefault.value}</Text>
                        <Text style={styles.questionText}>When given a multiple defaults you chose: the {answers.multipleDefaults[0].value} and the {answers.multipleDefaults[1].value}</Text>
                    </ScrollView>
                </View>
            </View>
  )
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
})

export default Survey;