import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

export const PublicRoute = ({ children }) => {
  const {isLogIn, token} = useContext(UserContext)


  // Si no está autenticado, redirigir al login
  if (token) {
    return <Navigate to="/"  replace />;
  }

  // Si está autenticado, mostrar el contenido
  return children;
};
