import React from 'react';

// Navigation imports
import { NavigationContainer}  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import SurveyScreen from '../screens/SurveyScreen';
import SurveyCompletedScreen from '../screens/SurveyCompletedScreen';
import Header from '../components/Header/index';
import AllFamiliesScreen from '../screens/AllFamiliesScreen';
import FamilyScreen from '../screens/FamilyScreen';
import FamilyMembers from '../screens/FamilyMembersScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {

  const FamilyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Families"
          component={AllFamiliesScreen}
          options={{ title: 'Families' }}
        />
        <Stack.Screen
          name="Family"
          component={FamilyScreen}
          options={({ route }) => ({ title: `${route.params.familyName} Family` })}
        />
        <Stack.Screen
          name="FamilyMembers"
          component={FamilyMembers}
          options={({ route }) => ({ title: `${route.params.familyName} Family Members` })}
        />
        <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={({ route }) => ({ title: `${route.params.type} Survey` })}
        />
        <Stack.Screen
        name="SurveyCompleted"
        component={SurveyCompletedScreen}
        options={({ route }) => ({ title: `${route.params.type} Survey Results` })}
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
          options={{ title: 'Home'}}
        />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={HomeStack}/>
        <Drawer.Screen name="Familys" children={FamilyStack}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}