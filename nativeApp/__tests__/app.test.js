// __tests__/app.test.js
import React from 'react';
import App from '../App.js';
import { createHttpLink } from 'apollo-link-http';
import renderer from 'react-test-renderer';

test('Tests Running Correctly', () => {
  expect(1).toBe(1);
});

test('Basic Arithmetic', () => {
  expect(2+2).toBe(4);
});