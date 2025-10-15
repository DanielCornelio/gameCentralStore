import pool from "../../db/config.js";

export const getCartByEmailModel = async (email) => {
    const querySQL = {
        text: `
    SELECT 
        j.id,
        j.titulo,
        j.genero,
        j.precio,
        j.portada_url,
        j.plataforma,
        c.fecha_agregado,
        c.cantidad,
        c.usuario_id
    FROM 
        carrito c
    LEFT JOIN 
        usuarios u ON u.id = c.usuario_id
    LEFT JOIN
        juegos j ON j.id = c.juego_id
    WHERE 
        u.email = $1;`,
        values: [email]
    }
    const { rows: carrito } = await pool.query(querySQL);
    return carrito;
}

export const createCartModel = async ({usuario_id, juego_id, cantidad}) => {
    const querySQL = {
        text: 'INSERT INTO carrito (usuario_id, juego_id, cantidad) VALUES ($1, $2, $3) RETURNING *',
        values:[usuario_id, juego_id, cantidad]
    }
    const {rows: carrito } = await pool.query(querySQL);
    return carrito;

}

export const clearCartByUserIdModel = async (usuario_id) =>{
    const querySQL = {
        text: 'DELETE FROM carrito WHERE usuario_id = $1',
        values: [usuario_id]
    }
    const result = await pool.query(querySQL);
    return result.rowCount;
}