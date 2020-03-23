import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const SurveyHomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Survey Home</Text>
      <Text>Take the Annual Survey</Text>
      <Button
        title="START"
        onPress={() => navigation.navigate('Survey')}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SurveyHomeScreen;