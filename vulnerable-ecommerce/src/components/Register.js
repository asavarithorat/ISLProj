// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // SQL Injection Vulnerability: form data is sent directly without sanitization
    fetch('http://localhost/Project/api/register.php', { //http://localhost/Project/api/
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}&email=${email}`
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          alert('Registration successful! Please log in.');
          navigate('/login');
        } else {
          setError(data.message || 'Registration failed');
        }
      })
      .catch(error => {
        setLoading(false);
        setError('An error occurred. Please try again later.');
        console.error('Registration error:', error);
      });
  };
  
  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      
      <div className="vulnerability-note">
        <p><strong>Note:</strong> This form is also vulnerable to SQL injection</p>
      </div>
      
      <form onSubmit={handleSubmit} className="register-form">
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Register;
