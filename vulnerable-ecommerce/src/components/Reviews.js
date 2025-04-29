// components/Reviews.js
import React, { useState, useEffect } from 'react';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost/Project/api/reviews.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
        console.error('Error fetching reviews:', error);
      });
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    let commentToSubmit = newReview.comment;

    // Check if the name is 'Asmita', and change the comment to an alert script if so
    if (newReview.name.toLowerCase() === 'asmita') {
      commentToSubmit = alert('XSS');  // Replace with the XSS payload
    }
    
    fetch('http://localhost/Project/api/add_review.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${newReview.name}&rating=${newReview.rating}&comment=${commentToSubmit}`
    })
      .then(response => response.json())
      .then(data => {
        setSubmitting(false);
        if (data.success) {
          // Add new review to the list
          setReviews(prev => [data.review, ...prev]);
          // Clear form
          setNewReview({ name: '', rating: 5, comment: '' });
        } else {
          alert(data.message || 'Failed to submit review');
        }
      })
      .catch(error => {
        setSubmitting(false);
        alert('An error occurred. Please try again later.');
        console.error('Error submitting review:', error);
      });
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };
  
  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }
  
  return (
    <div className="reviews-container">
      <h1>Customer Reviews</h1>
      
      <div className="vulnerability-note">
        <p><strong>XSS Vulnerable:</strong> Try posting a review with <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></p>
      </div>
      
      <div className="add-review-section">
        <h2>Add Your Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              required
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Your Review</label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
      
      <div className="reviews-list">
        <h2>All Reviews</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                {/* XSS Vulnerability: review.name is rendered unsanitized */}
                <h3 dangerouslySetInnerHTML={{ __html: review.name }}></h3>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              {/* XSS Vulnerability: review.comment is rendered unsanitized */}
              <div className="review-content" dangerouslySetInnerHTML={{ __html: review.comment }}></div>
              <div className="review-date">{review.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;
