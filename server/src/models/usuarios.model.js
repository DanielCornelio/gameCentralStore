import bcrypt from "bcryptjs";
import pool from "../../db/config.js";

export const getUsersModel = async () => {
    const querySQL = 'SELECT * FROM usuarios';
    const { rows: usuarios } = await pool.query(querySQL);
    return usuarios;
}

export const getUserByEmailModel = async (email) => {
    const querySQL = {
        text: 'SELECT * FROM usuarios WHERE email = $1',
        values: [email]
    }
    const { rows: usuario } = await pool.query(querySQL);
    return usuario;  
}

export const createUserModel = async ({ nombre, email, password }) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const querySQL = {
        text: 'INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        values: [nombre, email, hashedPassword]
    }
    const { rows: nuevoUsuario } = await pool.query(querySQL);
    return nuevoUsuario[0];  
}