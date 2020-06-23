import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
// //import MockAsyncStorage from 'mock-async-storage';

import App from './App'

// describe('<App />', () => {
//     it('has 3 children', () => {
//         const tree = renderer.create(<App />).toJSON();
//         console.log(tree)
//     })
// })


jest.useFakeTimers();

test('renders correctly', async () => {
    const tree = renderer.create(<App />).toJSON();

    renderer.act(() => jest.advanceTimersByTime(1000))

    expect(tree).toMatchSnapshot();
});