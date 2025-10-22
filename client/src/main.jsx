import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import CartProvider from './contexts/CartContext.jsx';
import UserProvider from './contexts/UserContext.jsx';
import FavoriteProvider from './contexts/FavoriteContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FavoriteProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
      </FavoriteProvider>
    </UserProvider>
  </StrictMode>,
)
