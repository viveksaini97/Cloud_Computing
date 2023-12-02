import './ShopkeeperPage.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';

const ShopkeeperPage = ({ onLogout, loyaltyPointsEarned }) => {
  const [customerInfo, setCustomerInfo] = useState({
    phoneNumber: '',
    transactionAmount: '',
    itemType: '',
  });

  const [redeemedPoints, setRedeemedPoints] = useState(0);
  const [loyaltyPointsAddition, setLoyaltyPointsAddition] = useState(0);

  useEffect(() => {
    // Calculate new loyalty points addition whenever redeemedPoints or transactionAmount changes
    const transactionAmount = parseFloat(customerInfo.transactionAmount);
    const redeemedPointsValue = parseFloat(redeemedPoints);

    const newLoyaltyPointsAddition = Math.floor(transactionAmount * 10) - redeemedPointsValue;
    setLoyaltyPointsAddition(newLoyaltyPointsAddition);
  }, [customerInfo.transactionAmount, redeemedPoints]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const transactionAmount = parseFloat(customerInfo.transactionAmount);
    const loyaltyPointsEarned = Math.floor(transactionAmount / 1) * 10;

    alert(`Loyalty Points Earned: ${loyaltyPointsEarned}`);
    setRedeemedPoints(0);
    setCustomerInfo({
      phoneNumber: '',
      transactionAmount: '',
      itemType: '',
    });
  };

  const handleRedeemPoints = () => {
    alert(`Points Redeemed: ${redeemedPoints}`);
  };

  return (
    <div className="shopkeeper-page-container">
      <h2 className="welcome-message">Welcome, Shopkeeper!</h2>
      <p>Loyalty Points Earned: {loyaltyPointsEarned}</p>
      <form className="transaction-form" onSubmit={handleFormSubmit}>
        <label className="form-label">Customer Phone Number:</label>
        <input
          type="tel"
          className="form-input"
          value={customerInfo.phoneNumber}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })}
          required
        />

        <label className="form-label">Transaction Amount ($):</label>
        <input
          type="number"
          step="0.01"
          className="form-input"
          value={customerInfo.transactionAmount}
          onChange={(e) => setCustomerInfo({ ...customerInfo, transactionAmount: e.target.value })}
          required
        />

        <label className="form-label">Type of Item:</label>
        <select
          className="form-input"
          value={customerInfo.itemType}
          onChange={(e) => setCustomerInfo({ ...customerInfo, itemType: e.target.value })}
          required
        >
          <option value="">Select...</option>
          <option value="grocery">Grocery</option>
          <option value="beverage">Beverage</option>
          <option value="electronics">Electronics</option>
        </select>

        <button className="submit-button" type="submit">
          Add Transaction
        </button>
      </form>

      <div className="redeem-section">
        <label className="form-label">Redeem Customer Points:</label>
        <input
          type="number"
          className="form-input"
          value={redeemedPoints}
          onChange={(e) => setRedeemedPoints(e.target.value)}
          required
        />

        <button className="redeem-button" onClick={handleRedeemPoints}>
          Redeem Points
        </button>
      </div>

      <p>New Loyalty Points Addition: {loyaltyPointsAddition}</p>

      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ShopkeeperPage;
