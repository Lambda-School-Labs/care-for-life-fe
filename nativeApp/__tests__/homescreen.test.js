import React from "react";
import App from "../App.js";
import renderer from "react-test-renderer";
import { styles } from "../screens/HomeScreen.js";

import { Text, TextInput, StyleSheet } from "react-native";

jest.setTimeout(15000);

test("Homescreen.js Tests Running Correctly", async () => {
  await expect(1).toBe(1);
});

test("Renders Text Correctly", async () => {
  const tree = renderer
    .create(<Text value="Annual Survey" style={styles.text} />)
    .toJSON();
  await expect(tree).toMatchSnapshot();
});
