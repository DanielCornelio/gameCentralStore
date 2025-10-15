import { createFavoriteModel, deleteFavoriteModel, getFavoritesByEmailModel } from "../models/favoritos.model.js";

export const getFavoritesByEmail = async (req, res) => {
    try {
        const {email} = req.user
        console.log(email)
        const favoritos = await getFavoritesByEmailModel(email);
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
        console.log('params',req.params)
        console.log('body',req.body)

        const { usuario_id, juego_id } = req.params;
        if(!usuario_id || !juego_id){
            res.status(400).json({ message: 'Bad Request. Faltan campos obligatorios'});
            return;
        }

        const juegoEliminado = await deleteFavoriteModel({usuario_id, juego_id});
        if(juegoEliminado === 0 ){
            res.status(404).json({ message: 'No se ha encontrado el favorito'});
            return;
        }
        res.status(200).json({ message: 'Se ha eliminado el favorito correctamente'});
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}