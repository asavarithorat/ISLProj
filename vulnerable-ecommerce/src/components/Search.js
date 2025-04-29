// components/Search.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [sqlInfo, setSqlInfo] = useState(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    setError(null);
    setSqlInfo(null);
    
    // SQL Injection Vulnerability: searchTerm is sent directly to the backend without sanitization
    fetch(`http://localhost/Project/api/search.php?term=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResults(data.products);
        if (data.sql_query) {
          setSqlInfo(data.sql_query);
        }
        setSearching(false);
      })
      .catch(error => {
        setError('Failed to complete search. Please try again later.');
        setSearching(false);
        console.error('Error searching products:', error);
      });
  };
  
  return (
    <div className="search-container">
      <h1>Search Products</h1>
      
      <div className="vulnerability-note">
        <p><strong>SQL Injection Vulnerable:</strong> Try searching with <code>' OR '1'='1</code></p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="search-input"
        />
        <button type="submit" className="btn search-btn" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {sqlInfo && (
        <div className="sql-info-box">
          <h3>SQL Query Info (Demonstration Only)</h3>
          <p>{sqlInfo}</p>
        </div>
      )}
      
      <div className="search-results">
        {results.length > 0 ? (
          <>
            <h2>Search Results</h2>
            <div className="product-grid">
              {results.map(product => (
                <div key={product.id} className="product-card">
                  <img src="/api/placeholder/200/150" alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <p className="product-description">{product.description.substring(0, 70)}...</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                </div>
              ))}
            </div>
          </>
        ) : searchTerm && !searching ? (
          <p>No products found matching your search.</p>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
