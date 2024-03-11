import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/auth/authSlice';

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    isLoggedIn ? <Outlet/> :<Navigate to="/auth/login" />
  )
  }
    
  


export default ProtectedRoutes;
