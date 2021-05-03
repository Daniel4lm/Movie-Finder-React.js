import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Movie Finder App link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Movie Finder App/i);
  expect(linkElement).toBeInTheDocument();
});
