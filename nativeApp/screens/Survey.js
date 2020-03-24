import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';

const Survey = ({route, navigation}) => {

//   console.log(route.params.survey)
  const answers = route.params.survey;
  return (
    <View style={styles.background}>
                <View style={styles.container}>
                    <ScrollView>
                            {answers.map(el => (
                    <Text>{el.questionId.replace(/_/g, ' ')}: {el.value.value ? el.value.value : el.value}</Text>
                    ))}
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