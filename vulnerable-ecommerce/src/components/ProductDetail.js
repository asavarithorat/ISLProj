// components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    fetch(`http://localhost/Project/api/product.php?id=${id}`) //http://localhost/Project/api/login.php
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
        console.error('Error fetching product:', error);
      });
  }, [id]);
  
  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!product) {
    return <div className="not-found">Product not found</div>;
  }
  
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const addToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
    // In a real app, you'd make an API call to add to cart
  };
  
  // XSS Vulnerability: product.name and product.description are rendered without sanitization
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={`http://localhost/Project/product_photos/${product.image}`}  alt={product.name} />
      </div>
      <div className="product-info">
        {/* XSS Vulnerability: product.name is rendered unsanitized */}
        <h1 dangerouslySetInnerHTML={{ __html: product.name }}></h1>
        <div className="product-price">${product.price}</div>
        {/* XSS Vulnerability: product.description is rendered unsanitized */}
        <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
        
        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              min="1" 
              max="10" 
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
