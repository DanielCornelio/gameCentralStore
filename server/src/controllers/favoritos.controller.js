import { createFavoriteModel, deleteFavoriteModel, getFavoritesModel } from "../models/favoritos.model.js";

export const getFavorites = async (req, res) => {
    try {
        const favoritos = await getFavoritesModel();
        res.status(200).json({results:favoritos});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const createFavorite = async (req, res) => {
    try {
        const {usuario_id, juego_id} = req.body;
        if(!usuario_id || !juego_id) {
            return res.status(400).json({ message: 'Bad Request. Missing required fields.'});
        }
        const nuevoFavorito = await createFavoriteModel({usuario_id, juego_id});
        res.status(201).json(nuevoFavorito);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const {id} = req.params;
        const juegoEliminado = await deleteFavoriteModel(id);
        if(juegoEliminado === 0 ){
            res.status(404).json({ message: 'Favorite not found'});
            return;
        }
        res.status(200).json({ message: 'Se ha eliminado el favorito correctamente'});
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}