import pool from "../../db/config.js";

export const getFavoritesByEmailModel = async (email) => {
    const querySQL = {
        text: `
    SELECT 
        f.juego_id,
        j.titulo,
        j.genero,
        j.precio,
        j.portada_url,
        j.plataforma,
        f.usuario_id
	FROM 
        favoritos f
	LEFT JOIN 
        usuarios u ON u.id = f.usuario_id
    LEFT JOIN 
        juegos j ON j.id = f.juego_id
	WHERE 
        u.email = $1;`,
        values: [email]
    }
    const { rows: favorito } = await pool.query(querySQL);
    return favorito;
}

export const createFavoriteModel = async ({ usuario_id, juego_id }) => {
    const querySQL = {
        text: 'INSERT INTO favoritos (usuario_id, juego_id) VALUES ($1, $2) RETURNING *',
        values: [usuario_id, juego_id]
    }
    const { rows: nuevoFavorito } = await pool.query(querySQL);
    return nuevoFavorito;
}

export const deleteFavoriteModel = async ({usuario_id, juego_id}) => {
    const querySQL = {
        text: 'DELETE FROM favoritos WHERE usuario_id=$1 AND juego_id=$2',
        values: [usuario_id, juego_id]
    };
    const result = await pool.query(querySQL);
    return result.rowCount;
}