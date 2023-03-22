import React from 'react';
import App from './App';
import { act, queryByAttribute, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store'

test('App render', async () => {
  const res = render(
    <Provider store={store}>
        <App />
    </Provider>,
  );
  await act(async () => {
    expect(queryByAttribute('id', res.container, 'app')).toBeFalsy()
  });
});

test('test render app', async () => {
  render(<App />)
  expect(screen.getByRole('link'))
})
