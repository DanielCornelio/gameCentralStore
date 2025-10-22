import React, { createContext, useContext, useEffect, useState } from "react";
import favoritesService from "../api/favorites";
import { UserContext } from "./UserContext"; // Importar UserContext
import toast from "react-hot-toast";

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [listFavorites, setListFavorites] = useState([]);

  const { user, token } = useContext(UserContext); // Obtener user y token del contexto

  const addFavorite = async (data) => {
    try {
      const response = await favoritesService.addToFavorite(data, token);
      if (response.success) {
        // Actualizar la lista local después de agregar
        setListFavorites((prev) => [...prev, response.data]);
        toast.success("Agregado a favoritos");
      }
      return response;
    } catch (error) {
      toast.error("Error al agregar a favoritos");
      throw error;
    }
  };

  const removeFavorites = async (data) => {
    try {
      const response = await favoritesService.removeFavorites(data);
      if (!response.error) {
        // Actualizar la lista local después de eliminar
        const updateList = getFavorites()
        setListFavorites(updateList);
        getFavorites()
        // toast.success(response.message);
      }
      return response;
    } catch (error) {
      toast.error("Error al eliminar de favoritos");
      throw error;
    }
  };

  const getFavorites = async () => {
    try {
      if (!user?.id && !token) {
        const response = await favoritesService.getFavoritesByEmail(
          user.id,
          token
        );
        setListFavorites([]);
        return;
      }
      
      const response = await favoritesService.getFavoritesByEmail(
        user.id,
        token
      );

      // Verificación segura de la respuesta
      if (response && response.data) {
        setListFavorites(response.data.results );
      } else {
        setListFavorites([]);
      }
    } catch (error) {
       if (error.response?.status === 401 || error.response?.status === 403) {
      toast.error("Sesión expirada");
      // Aquí podrías limpiar el token y redirigir al login
      setListFavorites([]);
    } else {
      toast.error("Error al cargar los favoritos");
    }
    console.error("Error en getFavorites:", error);
  }
  };

  // Cargar favoritos cuando el usuario cambie
  useEffect(() => {
    if (user && token) {
      getFavorites();
    } else {
      setListFavorites([]); // Limpiar favoritos si no hay usuario
    }
  }, [user, token]);

  const globalFavoriteState = {
    addFavorite,
    getFavorites,
    removeFavorites,
    listFavorites,
    setListFavorites,
  };

  return (
    <FavoriteContext.Provider value={globalFavoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
