// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sqlInfo, setSqlInfo] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSqlInfo(null);
    
    // SQL Injection Vulnerability: username and password are sent directly without sanitization
    fetch('http://localhost/Project/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          onLogin(data.username);
          navigate('/');
        } else {
          setError(data.message || 'Login failed');
        }
        
        if (data.sql_query) {
          setSqlInfo(data.sql_query);
        }
      })
      .catch(error => {
        setLoading(false);
        setError('An error occurred. Please try again later.');
        console.error('Login error:', error);
      });
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      
      <div className="vulnerability-note">
        <p><strong>SQL Injection Vulnerable:</strong> Try username: <code>admin' --</code> (any password)</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {sqlInfo && (
        <div className="sql-info-box">
          <h3>SQL Query Info (Demonstration Only)</h3>
          <p>{sqlInfo}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
