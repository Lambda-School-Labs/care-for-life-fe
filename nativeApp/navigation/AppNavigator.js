// import {
//   createAppContainer,
//   createSwitchNavigator
// } from '@react-navigation/native';

// import MainTabNavigator from './MainTabNavigator';

// export default createAppContainer(
//   createSwitchNavigator({
//     Main: MainTabNavigator
//   })
// );
import React from 'react';

// Navigation imports
import { NavigationContainer}  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import SurveyScreen from '../screens/SurveyScreen';
import SurveyCompletedScreen from '../screens/SurveyCompletedScreen';
import SurveyHomeScreen from '../screens/SurveyHomeScreen';
import Header from '../components/Header/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {

  const SurveyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SurveyHome"
          component={SurveyHomeScreen}
          options={({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Surveys'/>
            }
          }}
        />
        <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{ title: 'Annual Survey' }}
        />
        <Stack.Screen
        name="SurveyCompleted"
        component={SurveyCompletedScreen}
        options={{ title: 'Survey Review'}}
        />
      </Stack.Navigator>
    )
  }
  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Home'/>
            }
          }}
        />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={HomeStack}/>
        <Drawer.Screen name="Surveys" children={SurveyStack}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}