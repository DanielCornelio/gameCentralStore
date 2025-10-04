import pool from "../../db/config.js";

export const getGamesModel = async () =>{
    const querySQL = 'SELECT * FROM juegos';
    const { rows: juegos } = await pool.query(querySQL);
    return juegos;
}

export const getGameByIdModel = async (id) =>{
    const querySQL = {
        text: "SELECT * FROM juegos WHERE id=$1",
        values: [id]
    }
    const {rows: juego} = await pool.query(querySQL);
    return juego;
}

export const createGameModel = async ({titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima} ) => {
    const querySQL = {
        text: 'INSERT INTO juegos (titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        values: [titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima]
    }
    const { rows: nuevoJuego } = await pool.query(querySQL);
    return nuevoJuego;
} 

 export const updateGameModel = async ( {titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima, id} ) => {
    const querySQL = {
        text: 'UPDATE juegos SET titulo=$1, descripcion=$2, precio=$3, precio_descuento=$4, desarrollador=$5, fecha_lanzamiento=$6, portada_url=$7, genero=$8, plataforma=$9, edad_minima=$10 WHERE id=$11 RETURNING *',
        values: [titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima, id]
    }

    const { rows: juegoActualizado} = await pool.query(querySQL)
    return juegoActualizado;
}

export const deleteGameModel = async (id) => {
    const querySQL = {
        text: 'DELETE FROM juegos WHERE id=$1',
        values: [id]
    };
    const result = await pool.query(querySQL);
    return result.rowCount;
}