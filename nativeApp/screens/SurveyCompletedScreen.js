import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const SurveyCompletedScreen = ({navigation}) => {
  return (
    <View>
      <Text>Survey completed</Text>
      <Button
        title="Go home"
        onPress={() => navigation.navigate('SurveyHome')}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SurveyCompletedScreen;