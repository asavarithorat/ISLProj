// components/Products.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost/Project/api/products.php') //http://localhost/Project/api/
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }, []);
  
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="products-container">
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={`http://localhost/Project/product_photos/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description.substring(0, 70)}...</p>
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
              <button className="btn btn-secondary">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
