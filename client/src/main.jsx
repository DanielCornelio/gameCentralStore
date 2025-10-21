import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router/index.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import CartProvider from './contexts/CartContext.jsx';
import UserProvider from './contexts/UserContext.jsx';
import FavoriteProvider from './contexts/FavoriteContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FavoriteProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      </CartProvider>
      </FavoriteProvider>
    </UserProvider>
  </StrictMode>,
)
