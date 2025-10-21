import { createGameModel, deleteGameModel, findGamesModel, getGameByIdModel, getGamesModel, updateGameModel } from "../models/juegos.model.js";

export const getAllGames = async (req, res) => {
    try {
        const juegos = await getGamesModel();
        res.status(200).json({results:juegos})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const findGamesWithFilters = async(req, res) => {
    try {
        const queryString = req.query;
        const juegos = await findGamesModel(queryString);
        res.status(200).json({results:juegos});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getGame = async (req, res) => {
    try {
        const {id} = req.params
        const juego = await getGameByIdModel(id);
        res.status(200).json({result:juego})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const createGame = async (req, res) => {
    try {
        const {titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero,stock, plataforma, edad_minima} = req.body;

        if(!titulo || !precio){
            res.status(400).json({ message: 'Faltan datos obligatorios' })
            return;
        }
        const nuevoJuego = await createGameModel({titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero,stock, plataforma, edad_minima})
        res.status(201).json(nuevoJuego);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateGame = async (req, res) => {
    try {
        const {id } = req.params;
        if(!id) {
            res.status(400).json({ message: 'Bad Request. Faltan campos obligatorios'});
        }
        const {titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero,stock, plataforma, edad_minima, activo} = req.body;

        const juegoActualizado = await updateGameModel({titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero,stock, plataforma, edad_minima,activo, id});
        if(juegoActualizado.length === 0 ){
            res.status(404).json({message: 'Juego no encontrado'});
            return;
        }

        res.status(200).json(juegoActualizado);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteGame = async (req, res) => {
    try {
        const {id} = req.params;
        const juegoEliminado = await deleteGameModel(id);
        if(juegoEliminado === 0) {
            res.status(404).json({message: 'Juego no encontrado'});
            return;
        }
        res.status(200).json({message: 'Juego eliminado correctamente'});
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}