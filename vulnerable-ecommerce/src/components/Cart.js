// components/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real app, this would fetch the cart from the server
    // For demonstration, we'll use mock data
    setTimeout(() => {
      setCartItems([
        { id: 1, name: 'Smartphone X2000', price: 999.99, quantity: 1, image:"smartphonex2000.jpeg" },
        { id: 3, name: 'Wireless Headphones', price: 249.99, quantity: 2, image:"wirelessheadphones.jpeg" }
      ]);
      setLoading(false);
    }, 500);
  }, []);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  
  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-product">
                        <img src={`http://localhost/Project/product_photos/${item.image}`} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeItem(item.id)} className="btn btn-small btn-danger">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-amount">${calculateTotal()}</span>
            </div>
            <div className="cart-actions">
              <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
              <button className="btn btn-primary">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
