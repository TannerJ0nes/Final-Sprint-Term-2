import React, { createContext, useContext, useReducer } from 'react';

const ShoppingCartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
      case 'CLEAR_CART':
  return {
    ...state,
    cartItems: [],
  };

    default:
      return state;
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartState.cartItems) {
      total += item.price * item.quantity;
    }
    // Calculate and add taxes (assuming tax rate is 10%)
    const taxes = total * 0.1;
    total += taxes;
    return total;
  };

  const confirmOrder = () => {
    // Perform any actions needed for order confirmation, such as making an API call
    // or updating the database with the order details.

    // After confirmation, show the "Thanks for your order" message using the browser alert.
    window.alert('Thanks for your order!');
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartState,
        dispatch,
        addToCart,
        removeFromCart,
        calculateTotal,
        confirmOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};
