// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to VulnerableShop</h1>
        <p>A demonstration e-commerce site with intentional security vulnerabilities</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
          <Link to="/search" className="btn btn-secondary">Search Products</Link>
        </div>
      </div>
      
      <div className="vulnerability-guide">
        <h2>Security Vulnerabilities Guide</h2>
        <div className="vuln-section">
          <h3>SQL Injection Vulnerabilities:</h3>
          <ul>
            <li>
              <strong>Search Page:</strong> Try entering <code>' OR '1'='1</code> in the search box
            </li>
            <li>
              <strong>Login Form:</strong> Try using <code>admin' --</code> as the username (any password)
            </li>
          </ul>
        </div>
        
        <div className="vuln-section">
          <h3>XSS Vulnerabilities:</h3>
          <ul>
            <li>
              <strong>Reviews Page:</strong> Try posting a review with <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
            </li>
            <li>
              <strong>Product Details:</strong> Try searching for a product with <code>&lt;img src=x onerror="alert('XSS')"&gt;</code>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src={`http://localhost/Project/product_photos/smartphonex2000.jpeg`}  alt="Smartphone X2000" />
            <h3>Smartphone X2000</h3>
            <p>$999.99</p>
            <Link to="/product/1" className="btn btn-small">View Details</Link>
          </div>
          <div className="product-card">
            <img src={`http://localhost/Project/product_photos/gaminglaptop.jpg`}  alt="Gaming Laptop Pro" />
            <h3>Gaming Laptop Pro</h3>
            <p>$1599.99</p>
            <Link to="/product/2" className="btn btn-small">View Details</Link>
          </div>
          <div className="product-card">
            <img src={`http://localhost/Project/product_photos/wirelessheadphones.jpeg`}  alt="Wireless Headphones" />
            <h3>Wireless Headphones</h3>
            <p>$249.99</p>
            <Link to="/product/3" className="btn btn-small">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
