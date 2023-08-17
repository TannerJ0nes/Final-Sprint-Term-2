const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20 },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 30 },
  // Add more products here
];

export const getProducts = () => products;

export const getProductById = (productId) =>
  products.find((product) => product.id === productId);
