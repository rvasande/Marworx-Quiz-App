// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <>
      {isLoggedIn && isAdmin ? children : <Navigate to='/login' />}
    </>
  );
};

export default AdminPrivateRoute;
