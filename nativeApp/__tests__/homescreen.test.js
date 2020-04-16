import React from 'react';
import App from '../App.js';
import renderer from 'react-test-renderer';
import {styles} from '../screens/HomeScreen.js'

import {
    Text,
    TextInput,
    StyleSheet
  } from 'react-native';

test('Homescreen.js Tests Running Correctly', () => {
  expect(1).toBe(1);
});

test('Renders Text Correctly', () => {
  const tree = renderer.create(<Text value="Annual Survey" style={styles.text}/>).toJSON();
  expect(tree).toMatchSnapshot();
});