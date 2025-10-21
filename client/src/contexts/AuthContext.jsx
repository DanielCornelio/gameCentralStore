import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import authService from '../api/auth';


// Crear el contexto
const AuthContext = createContext();

const auth = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    console.log(`response ${response}`)
    return response;
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
}

// Estados de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user,
        token: action.payload.token,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null,
        token: null,
        error: action.payload 
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null 
      };
    case 'REGISTER_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user: JSON.parse(user)
        }
      });
    }
  }, []);

  // Función de login
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
    const response = await authService.login(credentials);

    if(response.error) {
      throw new Error(response.message);
    }

      // Por ahora simulamos la autenticación (cambiar por API real en Hito 3)
      const mockResponse = {
        token: response.data.token,
        user: {
          email: response.data.user.email,
          role: response.data.user.rol
        }
      };

      // Guardar en localStorage
      localStorage.setItem('token', mockResponse.token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: mockResponse
      });

      toast.success('¡Sesión iniciada correctamente!');
      return true;
    } catch (error) { debugger
      const errorMessage = error || 'Error al iniciar sesión';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      toast.error(errorMessage);
      return false;
    }
  };

  // Función de registro
  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Simulación del registro (cambiar por API real en Hito 3)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'REGISTER_SUCCESS' });
      toast.success('¡Cuenta creada exitosamente! Puedes iniciar sesión.');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear la cuenta';
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errorMessage
      });
      toast.error(errorMessage);
      return false;
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Sesión cerrada correctamente');
  };

  // Valor del contexto
  const value = {
    ...state,
    login,
    register,
    logout,

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
