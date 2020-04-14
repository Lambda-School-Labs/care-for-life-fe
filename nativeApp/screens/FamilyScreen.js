import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { annualSurvey } from '../surveys/annualSurvey.js';

const FamilyScreen = ({ route, navigation }) => {
  // Displays the family name
  // Ability to take surveys here

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color="black"
          title="Annual Survey"
          onPress={() =>
            navigation.navigate('Survey', {
              familyName: route.params.familyName,
              survey: annualSurvey,
              type: 'Family',
            })
          }
        />
        <Button
          style={styles.button}
          color="black"
          title="Another Survey"
          onPress={() => console.log('Nothing here yet')}
        />
        <Button
          style={styles.button}
          color="black"
          title="Another Survey"
          onPress={() => console.log('Nothing here yet')}
        />
      </View>
      <View style={{ flex: 1, width: '80%', justifyContent: 'center' }}>
        <Button
          style={styles.button}
          color="green"
          title="Individual Survey"
          onPress={() =>
            navigation.navigate('FamilyMembers', {
              familyName: route.params.familyName,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    flex: 1,
  },
  button: {
    width: '95%',
    justifyContent: 'center',
    padding: '5px',
  },
});

export default FamilyScreen;
