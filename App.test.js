// import React from 'react';
// import 'react-native';
// import renderer from 'react-test-renderer';
// //import MockAsyncStorage from 'mock-async-storage';

// import App from './App'

// describe('<App />', () => {
//     it('has 3 children', () => {
//         const tree = renderer.create(<App />).toJSON();
//         expect(tree.children.length).toBe(1);
//     })
// })

// const mock = () => {
//     const mockImpl = new MockAsyncStorage()
//     jest.mock('AsyncStorage', () => mockImpl)
// }

// mock();

// import { AsyncStorage as storage } from 'react-native'

// describe('<App />', () => {
//     it('renders correctly', () => {
//         renderer.create(<App />);
//     });

// it('Mock Async Storage working', async () => {
//     await storage.setItem('myKey', 'myValue')
//     const value = await storage.getItem('myKey')
//     expect(value).toBe('myValue')
// })
// })

import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', async () => {
    const tree = renderer.create(<App />).toJSON();

    renderer.act(() => jest.advanceTimersByTime(1000))

    expect(tree).toMatchSnapshot();
});