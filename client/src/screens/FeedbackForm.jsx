import React, { useState, useEffect } from 'react';
import './FeedbackForm.css'; 

const FeedbackForm = ({ user }) => {
  const [category, setCategory] = useState('Product Features');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);


  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const feedbackData = { category, rating, comments };
    const userToken = JSON.parse(localStorage.getItem('user'))?.token;
    console.log(userToken)
  
    try {
      const response = await fetch('http://localhost:5152/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(feedbackData),
      });
  
      if (response.ok) {
        console.log('Feedback submitted successfully');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  
    // Clear the form after submission
    setCategory('Product Features');
    setRating(0);
    setComments('');
  };

  
  const handleRetrieveData = async () => {
    try {
      const token = localStorage.getItem("user"); 
      const response = await fetch('http://localhost:5152/feedback-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFeedbackData(data.feedbackData);
        console.log('Feedback data retrieved successfully:', data);
      } else {
        console.error('Failed to retrieve feedback data');
      }
    } catch (error) {
      console.error('Error retrieving feedback data:', error);
    }
  };

  useEffect(() => {
    handleRetrieveData();
  }, []); 

  return (
    <div className="container">
      <div className="left-container">
        <h1>Feedback Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Product Features">Product Features</option>
              <option value="Product Pricing">Product Pricing</option>
              <option value="Product Usability">Product Usability</option>
            </select>
          </label>
          <br />
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <br />
          <label>
            Comments:
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      <div className="right-container">
        <h1>Dear {user?.email}</h1>
        <p>You are viewing this page because you are logged in or you just signed up</p>
        <div>
          <button
            onClick={logout}
            style={{
              color: 'red',
              border: '1px solid gray',
              backgroundColor: 'white',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        <div>
          <h2>Your Feedback Data:</h2>
          <ul>
            {feedbackData.map((feedback, index) => (
              <li key={index}>
                <p><strong>Category:</strong> {feedback.category}</p>
                <p><strong>Rating:</strong> {feedback.rating}</p>
                <p><strong>Comments:</strong> {feedback.comments}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleRetrieveData}>Retrieve Feedback Data</button>
        </div>
      </div>
    </div>
  );
};


export default FeedbackForm;
