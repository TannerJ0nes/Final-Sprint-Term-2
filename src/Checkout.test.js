import React from 'react';
import { render } from '@testing-library/react';
import Checkout from './Checkout';

test('renders checkout page', () => {
  const { getByText } = render(<Checkout />);
  const pageTitle = getByText(/Checkout/i);
  expect(pageTitle).toBeInTheDocument();
});
