import pool from "../../db/config.js";

export const getRatingsModel = async (juego_id) => {
    const querySQL = {
        text: `
            SELECT 
                r.id, 
                r.usuario_id, 
                r.juego_id, 
                r.calificacion, 
                r.comentario, 
                r.fecha_creacion, 
                r.titulo, 
                u.username,
                u.avatar_url
            FROM ratings r
            LEFT JOIN 
                usuarios u ON u.id = r.usuario_id
            WHERE r.juego_id = $1
        `,
        values: [juego_id]
    }
    const { rows: ratings } = await pool.query(querySQL);
    return ratings;
}

export const getRatingsByUserId = async({usuario_id, juego_id}) => {
    const querySQL = {
        text: 'SELECT * FROM ratings WHERE usuario_id = $1 AND juego_id = $2',
        values: [usuario_id, juego_id]
    }
    const {rows: comentario} = await pool.query(querySQL)
    return comentario
}

export const createRatingsModel = async ({juego_id, usuario_id, calificacion, titulo, comentario}) => {
    const querySQL = {
        text:'INSERT INTO ratings (juego_id, usuario_id, calificacion, titulo, comentario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [juego_id, usuario_id, calificacion, titulo, comentario]
    }
    const { rows: nuevoComentario } = await pool.query(querySQL);
    return nuevoComentario;
}