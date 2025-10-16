import React, { createContext, useEffect, useState } from "react";
import authService from "../api/auth";
import toast from "react-hot-toast";
import usuariosService from "../api/usuarios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const checkauth = async() => {
    if(token){
      const response = await usuariosService.me()
      if(response.error || response.status != 200 ){
        return
      }
      setUser(response.data.results)
    }
  }
  useEffect(() => {
    checkauth()
  }, [])
  

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        setUser(response.data.user);
        setToken(response.data.token);
      }
      return response;
    } catch (error) {
      if (error.response) {
        console.log(error.data.message);
        return error.response.data;
      }
    }
  };

  const isLogIn = () => {
    return token;
  };

  const logout = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    
  };
  const globalUserState = {
    login,
    user,
    isLogIn,
    token,
    logout
  };
  return (
    <UserContext.Provider value={globalUserState}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
