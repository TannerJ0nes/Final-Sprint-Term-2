import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import { useShoppingCart } from './ShoppingCartContext';
import './styles.css';
import './custom.css'; // Import the custom CSS file

const App = () => {
  const { cartState } = useShoppingCart();
  const cartCount = cartState.cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    marginRight: '20px',
  };

  const dropdownContentStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#fff',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: '1',
  };

  const dropdownItemStyle = {
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'inline-block', // Change to inline-block
    color: '#000',
    transition: 'background-color 0.3s',
    marginRight: '20px', // Add margin to create spacing
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#f5f5f5',
    textDecoration: 'underline',
  };

  return (
    <div>
      <div className='header'>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ ...dropdownItemStyle, fontSize: '28px', fontWeight: 'bold', marginRight: 'auto' }}>
            AF Emporium
          </Link>
          <div>
            <Link to="/cart" style={{ ...dropdownItemStyle }}>
              Shopping Cart {cartCount > 0 && <span>({cartCount})</span>}
            </Link>
            <div className="dropdown" ref={dropdownRef} style={dropdownStyle}>
              <span onClick={toggleDropdown} style={dropdownItemStyle}>
                Categories
              </span>
              {isDropdownOpen && (
                <ul className="dropdown-content" style={dropdownContentStyle}>
                  <li>
                    <Link to="/category/Action-Figures" style={dropdownItemStyle} className="dropdown-item">
                      Action Figures
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/Funko-Pops" style={dropdownItemStyle} className="dropdown-item">
                      Funko Pop's
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/Custom-Made" style={dropdownItemStyle} className="dropdown-item">
                      Custom Made
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/Legos" style={dropdownItemStyle} className="dropdown-item">
                      Legos
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/category/:categoryName" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
