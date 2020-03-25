import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { familySurvey } from '../surveys/familySurvey';

const FamilyScreen = ({route, navigation}) => {
  // Displays the family name
  // Ability to take surveys here
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Annual Survey"
          onPress={() => navigation.navigate('Survey', {name: route.params.name, survey: familySurvey, type: 'Family'})}
        />
        <Button
          title="Another Survey"
          onPress={() => console.log('Nothing here yet')}
        />
        <Button
          title="Another Survey"
          onPress={() => console.log('Nothing here yet')}
        />
      </View>
      <View style={{flex: 1, width: '80%', justifyContent: 'center'}}>
        <Button
          color="green"
          title="Individual Survey"
          onPress={() => navigation.navigate('FamilyMembers', {name: route.params.name})}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    flex: 1
  }
})

export default FamilyScreen;