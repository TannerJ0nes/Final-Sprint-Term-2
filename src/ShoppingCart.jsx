import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingCart } from './ShoppingCartContext';
import './ShoppingCart.css'; // Import your custom CSS file for styling

const ShoppingCart = () => {
  const { cartState, removeFromCart } = useShoppingCart();
  const { cartItems } = cartState;
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="shopping-cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Continue shopping!</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <p>Total: ${calculateSubtotal().toFixed(2)}</p>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
