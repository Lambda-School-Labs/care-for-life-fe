// __tests__/app.test.js
import React from 'react';
import App from '../App.js';
import { createHttpLink } from 'apollo-link-http';
import renderer from 'react-test-renderer';

test('Tests Running Correctly', () => {
  expect(1).toBe(1);
});

test('App.js Renders Correctly', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});