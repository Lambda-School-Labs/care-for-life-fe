import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { Bar }  from 'react-native-progress';

const SurveyCompletedScreen = ({navigation}) => {
  const progressNumber = 1.0;
  return (
    <View style={styles.container}>
      <Text>Survey completed</Text>
      <Bar style={styles.bar} progress={progressNumber} color={'#333'} borderWidth={2} borderColor={'black'} />
      <Text>Progress: {progressNumber * 100} %</Text>
      <Button
        title="Go home"
        onPress={() => navigation.navigate('SurveyHome')}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar:{
    margin: 20,
    width: '80%'
  }
})

export default SurveyCompletedScreen;