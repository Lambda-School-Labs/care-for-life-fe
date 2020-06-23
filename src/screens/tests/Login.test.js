import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import App from '../../../App';
import Login from '../Login';

jest.useFakeTimers();

test('renders correctly', async () => {
    const tree = renderer.create(<App><Login /></App>).toJSON();

    renderer.act(() => jest.advanceTimersByTime(1000));

    expect(tree).toMatchSnapshot();
})