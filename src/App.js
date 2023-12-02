// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import ShopkeeperPage from './ShopkeeperPage';
import LoginForm from './loginform';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType('');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm loggedIn={loggedIn} userType={userType} onLogin={handleLogin} />}
        />
        <Route
          path="/customer"
          element={
            loggedIn && userType === 'customer' ? (
              <CustomerPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/shopkeeper"
          element={
            loggedIn && userType === 'shopkeeper' ? (
              <ShopkeeperPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
