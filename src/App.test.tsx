import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders Try searching for a topic, for example', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Try searching for a topic, for example/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders My Reading Whishlist (0)', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/My Reading Whishlist/i);
  expect(linkElement).toBeInTheDocument();
});

it('should contains "bookSearchComponent"', () => {
  const { getByTestId } = render(<App />);
  expect( getByTestId('book-search-component') ).toBeDefined();
});

it('should contains "wish-list-component"', () => {
  const { getByTestId } = render(<App />);
  expect( getByTestId('wish-list-component') ).toBeDefined();
});
