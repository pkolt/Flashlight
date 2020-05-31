/* eslint-disable jest/no-disabled-tests */
import 'react-native';
import React from 'react';
import { App } from '../src/App';

// Note: test renderer must be required after react-native.
import { act, create } from 'react-test-renderer';

xit('renders correctly', () => {
  act(() => {
    create(<App />);
  });
});
