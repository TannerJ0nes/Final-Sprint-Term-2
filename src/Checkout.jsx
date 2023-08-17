import React from 'react';
import { useShoppingCart } from './ShoppingCartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartState, calculateTotal, confirmOrder, dispatch } = useShoppingCart();
  const { cartItems } = cartState;

  console.log("cartItems:", cartItems); // Log the cartItems array

  const handleConfirmOrder = () => {
    console.log("Confirming order..."); // Log that the order confirmation is being attempted
    confirmOrder();
    dispatch({ type: 'CLEAR_CART' }); // Clear the cartItems state

    // You might not need this line anymore
    // window.location.reload();
  };

  console.log("Total:", calculateTotal()); // Log the calculated total

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            {/* Display item details */}
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p className="checkout-total">Total (including taxes): ${calculateTotal().toFixed(2)}</p>
      <button className="confirm-button" onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
