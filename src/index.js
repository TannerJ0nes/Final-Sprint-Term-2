import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ShoppingCartProvider } from './ShoppingCartContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
