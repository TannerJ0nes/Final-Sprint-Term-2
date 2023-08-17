import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShoppingCart } from './ShoppingCartContext';
import useApiFetch from './useApiFetch';
import './ProductDetails.css'; // Make sure to import your CSS file

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useShoppingCart();
  const { data: product, loading, error } = useApiFetch(`/products/${id}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img className="product-details-image" src={product.image} alt={product.name} />
        <div className="product-details-content">
          <h2>{product.name}</h2>
          <p className="product-details-description">{product.description}</p>
          <p className="product-details-price">${product.price}</p>
          <button
            className="product-details-add-to-cart-button"
            onClick={() => handleAddToCart(product, 1)}
          >
            Add to Cart
          </button>
          <Link className="product-details-back-link" to="/">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
