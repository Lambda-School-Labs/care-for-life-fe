// __tests__/app.test.js
import React from "react";
import App from "../App.js";
import renderer from "react-test-renderer";

test("Tests Running Correctly", async () => {
  expect(1).toBe(1);
});

// test('App.js Renders Correctly', async () => {
//   const tree = renderer.create(<App/>).toJSON();
//   await expect(tree).toMatchSnapshot();
// });
