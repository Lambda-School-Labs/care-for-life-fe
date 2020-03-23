import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const SurveyScreen = ({navigation}) => {
  return (
    <View>
      <Text>Survey goes here</Text>
      <Button
        title="Complete the survey"
        onPress={() => navigation.navigate('SurveyCompleted')}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SurveyScreen;