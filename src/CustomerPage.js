import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerPage.css'; // Import the CSS file for styling

const CustomerPage = ({ onLogout }) => {
  // State to store customer details
  const [customerData, setCustomerData] = useState(null);

  // Effect to fetch customer details on component mount
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        // Replace '/api/customerDetails' with the actual endpoint for fetching customer details
        const response = await axios.get('/api/customerDetails');

        if (response.data.success) {
          // Set customer details in state
          setCustomerData(response.data.customer);
        } else {
          // Handle error (e.g., invalid response format, server error)
          console.error('Error fetching customer details:', response.data.error);
        }
      } catch (error) {
        // Handle network error
        console.error('Network error:', error);
      }
    };

    // Call the fetchCustomerDetails function
    fetchCustomerDetails();
  }, []); // Empty dependency array ensures the effect runs only on mount

  return (
    <div className="customer-page-container">
      <h2 className="welcome-message">Welcome, {customerData?.name || 'Customer'}!</h2>
      {customerData && (
        <div className="customer-info">
          <p className="info-item">Email: {customerData.email}</p>
          <p className="info-item">Loyalty Points: {customerData.loyaltyPoints}</p>
          {/* Add more customer details as needed */}
        </div>
      )}
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default CustomerPage;
