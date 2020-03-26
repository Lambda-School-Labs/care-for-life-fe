import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../components/Card';
import { personSurvey } from '../surveys/personSurvey';

const FamilyMembers = ({navigation, route}) => {
  // Display all family members for the respective family
  const [members, setMembers] = useState([
    {id: '0', name: 'Kyle'},
    {id: '1', name: 'Sarah'},
    {id: '2', name: 'Jenn'},
    {id: '3', name: 'Xavier'},
  ])
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>Which familiy member is taking the survey?</Text>
      <FlatList
      data={members}
      renderItem={data => {
        return (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Survey', {personName: data.item.name, survey: personSurvey, type: 'Person', familyName: route.params.familyName})} 
            activeOpacity={0.7}
            style={styles.container}
          >
            <Card style={styles.card}>
              <Text>{data.item.name}</Text>
            </Card>
          </TouchableOpacity>
        )
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  card: {
    marginVertical: 10,
    width: '80%'
  }
})

export default FamilyMembers;