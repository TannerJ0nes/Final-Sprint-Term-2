import React from 'react';
import { render } from '@testing-library/react';
import { ShoppingCartProvider } from './ShoppingCartContext';
import Checkout from './Checkout';

test('calculates cart total', () => {
  const sampleCartItems = [
    { id: 1, name: 'Item 1', price: 10.0, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20.0, quantity: 3 },
  ];

  const { getByText } = render(
    <ShoppingCartProvider>
      <Checkout />
    </ShoppingCartProvider>
  );

  // Set sample cart items
  sampleCartItems.forEach(item => {
    fireEvent.click(getByText(item.name));
  });

  // Calculate expected total
  const expectedTotal = sampleCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Check if cart total is displayed correctly
  const cartTotal = getByText(new RegExp(`Total (including taxes): \\$${expectedTotal.toFixed(2)}`));
  expect(cartTotal).toBeInTheDocument();
});
