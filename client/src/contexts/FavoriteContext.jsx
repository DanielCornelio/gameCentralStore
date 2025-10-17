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
        setListFavorites(prev => [...prev, response.data]);
        toast.success("Agregado a favoritos");
      }
      return response;
    } catch (error) {
      toast.error("Error al agregar a favoritos");
      throw error;
    }
  };

  const removeFavorites = async (data) => {
    console.log("datttttaaa:",data)
    try {
      const response = await favoritesService.removeFavorites(data);
      if (response.success) {
        // Actualizar la lista local después de eliminar
        setListFavorites(prev => prev.filter(fav => 
          !(fav.usuario_id === data.usuario_id && fav.juego_id === data.juego_id)
        ));
        toast.success("Eliminado de favoritos");
      }
      return response;
    } catch (error) {
      toast.error("Error al eliminar de favoritos");
      throw error;
    }
  };

  const getFavorites = async () => {
    try {
      if (user?.id && token) {
        const response = await favoritesService.getFavoritesByEmail(user.id, token);
        setListFavorites(response.data.results || response.data || []);
        await getFavorites();
      }
    } catch (error) {
      console.error("Error al cargar los favoritos:", error);
      toast.error("Error al cargar los favoritos");
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
    setListFavorites
  };

  return (
    <FavoriteContext.Provider value={globalFavoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;