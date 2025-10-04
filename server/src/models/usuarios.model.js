import pool from "../../db/config.js";

export const getUsersModel = async () =>{
    const querySQL = 'SELECT * FROM usuarios';
    const { rows: usuarios } = await pool.query(querySQL);
    return usuarios;
}
export const createUserModel = async (username, email, password_hash) => {
    const querySQL = {
        text: 'INSERT INTO usuarios (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        values: [username, email, password_hash]
    }
    const { rows: nuevoUsuario } = await pool.query(querySQL);
    return nuevoUsuario;
} 