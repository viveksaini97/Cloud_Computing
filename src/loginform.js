import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginForm.css';

const LoginForm = ({ loggedIn, userType, onLogin }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [selectedUserType, setSelectedUserType] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Temporary test users (replace with your actual authentication logic)
    const testUsers = {
      customer: { username: 'customer1', phoneNumber: '1234567890', password: 'password1' },
      shopkeeper: { username: 'shopkeeper1', phoneNumber: '9876543210', password: 'password1' },
    };

    if (selectedUserType === '' || identifier === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      setError('');

      const user = testUsers[selectedUserType];

      if (!user) {
        setError('Invalid user type');
        return;
      }

      // Make an asynchronous request to your backend for user validation
      try {
        const response = await axios.post('/api/login', {
          userType: selectedUserType,
          identifier,
          password,
        });

        if (response.data.success) {
          // User is valid, perform login
          onLogin(selectedUserType);

          // Redirect based on user type after successful login
          if (selectedUserType === 'customer') {
            navigate('/customer');
          } else if (selectedUserType === 'shopkeeper') {
            navigate('/shopkeeper');
          }
        } else {
          // Backend validation failed
          setError('Invalid username or password');
        }
      } catch (error) {
        // Handle error (e.g., network error, server error)
        console.error('Error during login:', error);
        setError('An error occurred during login');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="header">Login Page</h2>
        {loggedIn && <p>You are already logged in as {userType}.</p>}
        {!loggedIn && (
          <div>
            <label className="label">Login as:</label>
            <select
              className="select"
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="customer">Customer</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
            <label className="label">Identifier:</label>
            <input
              type="text"
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <label className="label">Password:</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleLogin}>
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
