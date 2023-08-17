import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ShoppingCartProvider } from './ShoppingCartContext';
import ProductDetails from './ProductDetails';

test('adds item to cart', () => {
  const { getByText, getByRole } = render(
    <ShoppingCartProvider>
      <ProductDetails />
    </ShoppingCartProvider>
  );

  // Simulate adding item to cart
  fireEvent.click(getByRole('button', { name: /Add to Cart/i }));

  // Check if cart count increases
  const cartCount = getByText(/\(1\)/);
  expect(cartCount).toBeInTheDocument();
});
