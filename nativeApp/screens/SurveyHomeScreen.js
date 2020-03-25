import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import Card from '../components/Card';

const SurveyHomeScreen = ({navigation, route}) => {

  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    if (route.params?.survey) {
      setSurveys([route.params?.survey, ...surveys])
    }
  }, [route.params?.survey])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Take the Annual Survey</Text>
      <Button
        title="START"
        onPress={() => navigation.navigate('Survey')}
      />
      <FlatList
        data={surveys}
        keyExtractor={item => Math.random().toString()}
        renderItem={({item}) => {
          return (
              <Button 
                title='survey' 
                onPress={() => navigation.navigate('oneSurvey', {survey: item})}
              />
          )}
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24
  }
})

export default SurveyHomeScreen;