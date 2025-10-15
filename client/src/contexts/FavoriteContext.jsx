
import React, { createContext, useEffect, useState } from "react";
import favoritesService from "../api/favorites";

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  
    const addFavorite = async (data) => {
        const response = await favoritesService.addToFavorite(data)
        return response
    }
  
  const globalUserState = {
    addFavorite
  };
  return (
    <FavoriteContext.Provider value={globalUserState}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
