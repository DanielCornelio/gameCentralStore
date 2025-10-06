import pool from "../../db/config.js";

export const getFavoritesModel = async () =>{
    const querySQL = 'SELECT * FROM favoritos';
    const { rows: favorito } = await pool.query(querySQL);
    return favorito;
}

export const createFavoriteModel = async ({usuario_id, juego_id} ) => {
    const querySQL = {
        text: 'INSERT INTO favoritos (usuario_id, juego_id) VALUES ($1, $2) RETURNING *',
        values: [usuario_id, juego_id]
    }
    const { rows: nuevoFavorito } = await pool.query(querySQL);
    return nuevoFavorito;
} 

export const deleteFavoriteModel = async (id) => {
    const querySQL = {
        text: 'DELETE FROM favoritos WHERE id=$1',
        values: [id]
    };
    const result = await pool.query(querySQL);
    return result.rowCount;
}