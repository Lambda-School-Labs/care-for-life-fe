import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../components/Card';

const AllFamiliesScreen = ({navigation}) => {
  // Pull all families from the database and display them.
  // Selecting a family will take you to the family screen
  // Button to add a family to database
  const [families, setFamilies] = useState([
    {id: '0', name: 'Smith'},
    {id: '1', name: 'Lambda'},
    {id: '2', name: 'Reeves'},
    {id: '3', name: 'DiCaprio'},
    {id: '4', name: 'Wahlberg'},
  ])
  return (
    <View style={{flex: 1}}>
      <FlatList
      data={families}
      renderItem={data => {
        return (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Family', {familyName: data.item.name})} activeOpacity={0.7}
            style={styles.container}
          >
            <Card style={styles.card}>
              <Text>{data.item.name} Family</Text>
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

export default AllFamiliesScreen;