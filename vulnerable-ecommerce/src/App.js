// App.js - Main React Application
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Reviews from './components/Reviews';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };
  
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    // In a real app, you'd also make a request to destroy the session on the server
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <h1>VulnerableShop</h1>
            <span className="warning-badge">DEMO ONLY</span>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              {loggedIn ? (
                <>
                  <li className="user-greeting">Hello, {username}</li>
                  <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <div className="security-banner">
          <h2>⚠️ SECURITY WARNING ⚠️</h2>
          <p>This website contains intentional security vulnerabilities (SQL Injection and XSS) for demonstration purposes.</p>
          <p>DO NOT use real credentials or deploy this to a production environment!</p>
        </div>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        
        <footer>
          <p>Educational Example - Intentionally Vulnerable App - Do Not Use In Production</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;