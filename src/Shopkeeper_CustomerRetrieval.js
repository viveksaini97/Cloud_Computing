import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Shopkeeper_CustomerRetrieval = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(null);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleRetrievePoints = async () => {
    try {
      const response = await axios.post('/api/retrieve-loyalty-points', {
        phoneNumber,
      });

      if (response.data.success) {
        const loyaltyPointsEarned = Math.floor(response.data.loyaltyPoints / 1) * 10;

        setLoyaltyPoints(response.data.loyaltyPoints);
        setError('');
        setRedirect(true);
      } else {
        setLoyaltyPoints(null);
        setError(response.data.message || 'Error retrieving loyalty points');
      }
    } catch (error) {
      console.error('Error during loyalty points retrieval:', error);
      setLoyaltyPoints(null);
      setError('An error occurred during loyalty points retrieval');
    }
  };

  if (redirect) {
    return <Navigate to={`/shopkeeper-page/${Math.floor(loyaltyPoints / 1) * 10}`} />;
  }

  return (
    <div className="customer-retrieval-container">
      <h2 className="header">Customer Loyalty Points Retrieval</h2>
      <div>
        <label className="label">Customer Phone Number:</label>
        <input
          type="tel"
          className="input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button className="submit-button" onClick={handleRetrievePoints}>
          Retrieve Loyalty Points
        </button>
      </div>
      {loyaltyPoints !== null && (
        <div className="loyalty-points-info">
          <p className="info-item">Loyalty Points: {loyaltyPoints}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Shopkeeper_CustomerRetrieval;
